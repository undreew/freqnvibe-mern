const Product = require('../models/product')
const HttpError = require('../models/httpError')
const { validationResult } = require('express-validator')
const fs = require('fs')
const { findById } = require('../models/user')
const mongoose = require('mongoose')

exports.getAllProducts = async (req, res, next) => {
	let products
	try {
		products = await Product.find()
	} catch (error) {
		return next(
			new HttpError(
				'Something went wrong while fetching products, please try again later',
				500
			)
		)
	}
	res.status(200).json({
		message: 'Products fetched.',
		products
	})
}

exports.getProductById = async (req, res, next) => {
	const productId = req.params.productId

	let product
	try {
		product = await Product.findById(productId)
	} catch (error) {
		return next(
			new HttpError(
				'Something went wrong while fetching products, please try again later',
				500
			)
		)
	}
	res.status(200).json({
		message: 'Product fetched.',
		product
	})
}

// NEEDS IMAGE UPLOAD
exports.postProduct = async (req, res, next) => {
	const { name, description, price, countInStock } = req.body

	if (!req.file) {
		return next(new HttpError('No image selected.', 400))
	}

	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		res.status(400).json({
			message: errors.array()[0].msg
		})
	}

	let existingProduct
	try {
		existingProduct = await Product.findOne({ name: name })
	} catch (error) {
		return next(
			new HttpError('Something went wrong, please try again later.', 500)
		)
	}

	if (existingProduct) {
		return next(new HttpError('Product already exists.', 409))
	}

	const createdProduct = new Product({
		name,
		description,
		price,
		countInStock,
		imageUrl: req.file.path
	})

	try {
		await createdProduct.save()
	} catch (error) {
		return next(
			new HttpError('Something went wrong, please try again later.', 500)
		)
	}

	res.status(201).json({
		message: 'Successfully created product.'
	})
}

// NEEDS IMAGE REUPLOAD
exports.patchProduct = async (req, res, next) => {
	const productId = req.params.productId
	const { name, description } = req.body

	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		res.status(400).json({
			message: errors.array()[0].msg
		})
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
		return next(new HttpError('No product found for the provided id.', 404))
	}

	existingProduct.name = name
	existingProduct.description = description

	try {
		await existingProduct.save()
	} catch (error) {
		return next(
			new HttpError('Something went wrong, please try again later.', 500)
		)
	}

	res.status(200).json({
		message: 'Successfully updated product.'
	})
}

exports.patchRestockProduct = async (req, res, next) => {
	const productId = req.params.productId
	const { countInStock } = req.body

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

	const existingCountInStock = existingProduct.countInStock
	let updatedCountInStock = +existingCountInStock + +countInStock

	existingProduct.countInStock = +updatedCountInStock

	try {
		existingProduct.save()
	} catch (error) {
		return next(
			new HttpError('Something went wrong, please try again later.', 500)
		)
	}

	res.status(200).json({
		message: 'Successfully edited product.'
	})
}

exports.deleteProduct = async (req, res, next) => {
	const productId = req.params.productId

	let existingProduct
	try {
		existingProduct = await Product.findById(productId)
		// REMOVE THE IMAGE FROM THE STORAGE
	} catch (error) {
		return next(
			new HttpError('Something went wrong, please try again later.', 500)
		)
	}

	if (!existingProduct) {
		return next(new HttpError('Place not found', 500))
	}

	const imagePath = existingProduct.imageUrl

	try {
		const session = await mongoose.startSession()
		session.startTransaction()
		await existingProduct.remove({ session: session })
		await session.commitTransaction()
	} catch (error) {
		return next(
			new HttpError('Something went wrong, please try again later.', 500)
		)
	}

	fs.unlink(imagePath, (error) => {
		console.log(error)
	})

	res.status(200).json({
		message: 'Successfully deleted product.'
	})
}
