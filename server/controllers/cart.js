const Cart = require('../models/cart')
const Product = require('../models/product')
const User = require('../models/user')
const HttpError = require('../models/httpError')
const mongoose = require('mongoose')

exports.getCart = async (req, res, next) => {
	const userId = req.params.userId

	let existingUser
	try {
		existingUser = await User.findById(userId)
	} catch (error) {
		return next(
			new HttpError('Something went wrong, please try again later.', 500)
		)
	}

	if (!existingUser) {
		return next(new HttpError('User not found.', 400))
	}

	let existingCart
	try {
		existingCart = await Cart.findOne({ userId: userId })
	} catch (error) {
		return next(
			new HttpError('Something went wrong, please try again later.', 500)
		)
	}

	if (!existingCart) {
		return next(new HttpError('Cart for this user is not found.', 400))
	}

	try {
		await existingCart.populate('cartItems.productId')
	} catch (error) {
		return next(new HttpError('Cart for this user is not found.', 400))
	}

	res.status(200).json({
		message: 'Successfully fetched cart.',
		cart: existingCart
	})
}

exports.addToCart = async (req, res, next) => {
	const { userId, productId, qty } = req.body

	let existingUser
	try {
		existingUser = await User.findById(userId)
	} catch (error) {
		return next(
			new HttpError('Something went wrong, please try again later.', 500)
		)
	}

	if (!existingUser) {
		return next(new HttpError('User not found.', 400))
	}

	let existingProduct
	try {
		existingProduct = await Product.findById(productId)
	} catch (error) {
		return next(
			new HttpError('Something went wrong, please try again later.', 500)
		)
	}

	if (!existingProduct) {
		return next(new HttpError('Product not found.', 400))
	}

	let existingCart
	try {
		existingCart = await Cart.findOne({ userId: userId })
	} catch (error) {
		return next(
			new HttpError('Something went wrong, please try again later.', 500)
		)
	}

	let existingCartItems = [...existingCart.cartItems]
	let toUpdateItemId = existingProduct.id
	let toUpdateItem = {}

	for (let i = 0; i < existingCartItems.length; i++) {
		let itemIds = existingCartItems[i].productId
		let itemIdsString = itemIds.toString().substring(0, itemIds.length)
		if (itemIdsString === toUpdateItemId) {
			toUpdateItem = existingCartItems[i]
		}
	}

	let itemStock = existingProduct.countInStock
	let itemQtyInCart = toUpdateItem.quantity ? toUpdateItem.quantity : 0
	let totalQty = itemQtyInCart + +qty

	if (totalQty > itemStock) {
		return res.status(422).json({
			message: 'Insufficient Stocks.'
		})
	}

	try {
		const session = await mongoose.startSession()
		session.startTransaction()
		existingCart.addToCart(existingProduct, qty, { session: session })
		await existingCart.save({ session: session })
		await session.commitTransaction()
	} catch (error) {
		return next(
			new HttpError('Something went wrong, please try again later.', 500)
		)
	}

	res.status(201).json({
		message: 'Successfully added to cart.'
	})
}

exports.reduceItemFromCart = async (req, res, next) => {
	const { userId, productId, productPrice, qty } = req.body

	let existingUser
	try {
		existingUser = await User.findById(userId)
	} catch (error) {
		return next(
			new HttpError('Something went wrong, please try again later.', 500)
		)
	}

	if (!existingUser) {
		return next(new HttpError('User not found.', 400))
	}

	let existingProduct
	try {
		existingProduct = await Product.findById(productId)
	} catch (error) {
		return next(
			new HttpError('Something went wrong, please try again later.', 500)
		)
	}

	if (!existingProduct) {
		return next(new HttpError('Product not found.', 400))
	}

	let existingCart
	try {
		existingCart = await Cart.findOne({ userId: userId })
	} catch (error) {
		return next(
			new HttpError('Something went wrong, please try again later.', 500)
		)
	}

	if (!existingCart) {
		return next(new HttpError('Cart for this user is not found.', 400))
	}

	try {
		const session = await mongoose.startSession()
		session.startTransaction()
		existingCart.reduceItemFromCart(productId, productPrice, qty, {
			session: session
		})
		await existingCart.save({ session: session })
		await session.commitTransaction()
	} catch (error) {
		return next(
			new HttpError('Something went wrong, please try again later.', 500)
		)
	}

	res.status(201).json({
		message: 'Successfully decreased item quantity from cart.'
	})
}

exports.removeFromCart = async (req, res, next) => {
	const { userId, productId } = req.body

	let existingUser
	try {
		existingUser = await User.findById(userId)
	} catch (error) {
		return next(
			new HttpError('Something went wrong, please try again later.', 500)
		)
	}

	if (!existingUser) {
		return next(new HttpError('User not found.', 400))
	}

	let existingProduct
	try {
		existingProduct = await Product.findById(productId)
	} catch (error) {
		return next(
			new HttpError('Something went wrong, please try again later.', 500)
		)
	}

	if (!existingProduct) {
		return next(new HttpError('Product not found.', 400))
	}

	let existingCart
	try {
		existingCart = await Cart.findOne({ userId: userId })
	} catch (error) {
		return next(
			new HttpError('Something went wrong, please try again later.', 500)
		)
	}

	if (!existingCart) {
		return next(new HttpError('Cart for this user is not found.', 400))
	}

	try {
		const session = await mongoose.startSession()
		session.startTransaction()
		existingCart.removeFromCart(productId, { session: session })
		await existingCart.save({ session: session })
		await session.commitTransaction()
	} catch (error) {
		return next(
			new HttpError('Something went wrong, please try again later.', 500)
		)
	}

	res.status(201).json({
		message: 'Successfully deleted from cart.'
	})
}
