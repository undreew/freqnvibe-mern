const User = require('../models/user')
const Cart = require('../models/cart')
const { validationResult } = require('express-validator')
const HttpError = require('../models/httpError')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

exports.getAllUsers = async (req, res, next) => {
	res.status(200).json({
		message: 'USERS FETCHED.'
	})
}

exports.signup = async (req, res, next) => {
	const { name, username, email, password, role } = req.body

	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json({
			message: errors.array()[0].msg
		})
	}

	let existingUser
	try {
		existingUser = await User.findOne({ username: username })
	} catch (error) {
		return next(
			new HttpError('Something went wrong, please try again later.', 500)
		)
	}

	if (existingUser) {
		return next(new HttpError('Username already exists.', 409))
	}

	let hashedPassword
	try {
		hashedPassword = await bcrypt.hash(password, 12)
	} catch (error) {
		return next(
			new HttpError('Something went wrong, please try again later.', 500)
		)
	}

	let isAdmin
	if (role === 'Admin') {
		isAdmin = true

		const createdUser = new User({
			name,
			username,
			email,
			password: hashedPassword,
			role,
			isAdmin
		})
		try {
			await createdUser.save()
		} catch (error) {
			return next(
				new HttpError('Something went wrong, please try again later.', 500)
			)
		}
	} else {
		isAdmin = false

		const userCart = new Cart({
			totalQuantity: 0,
			grandTotal: 0
		})

		try {
			await userCart.save()
		} catch (error) {
			return next(
				new HttpError('Something went wrong, please try again later.', 500)
			)
		}

		const createdUser = new User({
			name,
			username,
			email,
			password: hashedPassword,
			role,
			isAdmin,
			cartId: mongoose.Types.ObjectId(userCart.id)
		})
		try {
			await createdUser.save()
		} catch (error) {
			return next(
				new HttpError('Something went wrong, please try again later.', 500)
			)
		}

		userCart.userId = mongoose.Types.ObjectId(createdUser.id)

		try {
			await userCart.save()
		} catch (error) {
			return next(
				new HttpError('Something went wrong, please try again later.', 500)
			)
		}
	}

	res.status(201).json({
		message: 'Signed Up Successfully.'
	})
}

exports.login = async (req, res, next) => {
	const { username, password, role } = req.body

	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		res.status(400).json({
			message: errors.array()[0].msg
		})
	}

	let existingUser
	try {
		existingUser = await User.findOne({ username: username })
	} catch (error) {
		return next(
			new HttpError('Something went wrong, please try again later.', 500)
		)
	}

	if (!existingUser) {
		return next(new HttpError('Invalid email or password.', 401))
	}

	let isMatch
	try {
		isMatch = await bcrypt.compare(password, existingUser.password)
	} catch (error) {
		return next(
			new HttpError('Something went wrong, please try again later.', 500)
		)
	}

	if (!isMatch) {
		return next(new HttpError('Invalid email or password.', 401))
	}

	let token
	try {
		token = jwt.sign(
			{
				userId: existingUser.id,
				username: existingUser.username,
				isAdmin: existingUser.isAdmin
			},
			process.env.JWT_KEY,
			{
				expiresIn: '1h'
			}
		)
	} catch (error) {
		return next(
			new HttpError('Something went wrong, please try again later.', 500)
		)
	}

	if (existingUser.role !== role) {
		return next(new HttpError('Roles doesnt match.', 401))
	}

	let isAdmin
	if (role === 'Admin') {
		isAdmin = true
	} else {
		isAdmin = false
	}

	res.status(200).json({
		message: 'Successfully Logged in.',
		userId: existingUser.id,
		username: existingUser.username,
		isAdmin: isAdmin,
		token
	})
}
