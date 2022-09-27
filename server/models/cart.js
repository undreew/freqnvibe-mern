const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
	cartItems: [
		{
			productId: {
				type: Schema.Types.ObjectId,
				ref: 'Product',
				required: false
			},
			quantity: {
				type: Number,
				required: false
			},
			subTotal: {
				type: Number,
				required: false
			}
		}
	],
	totalQuantity: {
		type: Number,
		required: false
	},
	grandTotal: {
		type: Number,
		required: false
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: false
	}
})

cartSchema.methods.addToCart = function (product, qty) {
	let updatedCartItems = [...this.cartItems]
	let newQuantity = qty
	let updatedQuantity = 0
	let updatedSubtotal = 0
	let updatedGrandTotal = 0
	let updatedTotalQuantity = 0

	const existingProductIndex = updatedCartItems.findIndex((item) => {
		return item.productId.toString() === product._id.toString()
	})

	if (existingProductIndex >= 0) {
		// UPDATE ITEM QUANTITY
		updatedQuantity =
			+this.cartItems[existingProductIndex].quantity + +newQuantity
		updatedCartItems[existingProductIndex].quantity = updatedQuantity
		// UPDATE ITEM SUBTOTAL
		updatedSubtotal =
			+this.cartItems[existingProductIndex].subTotal +
			+newQuantity * +product.price
		updatedCartItems[existingProductIndex].subTotal = updatedSubtotal
		// UPDATE CART TOTAL QUANTITY
		updatedTotalQuantity = +this.totalQuantity + +newQuantity
		// UPDATE CART GRANDTOTAL
		updatedGrandTotal = +this.grandTotal + +newQuantity * +product.price
	} else {
		// ADD THE RRODUCT
		updatedCartItems.push({
			productId: product._id,
			quantity: +qty,
			subTotal: +newQuantity * +product.price
		})

		updatedTotalQuantity = +this.totalQuantity + +newQuantity

		if (this.grandTotal) {
			updatedGrandTotal = +this.grandTotal + Number(product.price) * newQuantity
		} else {
			const startingCartGrandTotal = 0
			updatedGrandTotal =
				+startingCartGrandTotal + Number(product.price) * newQuantity
		}
	}

	this.totalQuantity = updatedTotalQuantity
	this.grandTotal = updatedGrandTotal
	this.cartItems = updatedCartItems
	return
}

cartSchema.methods.reduceItemFromCart = function (
	productId,
	productPrice,
	qty
) {
	let updatedCartItems = [...this.cartItems]
	let updatedItemQuantity = 0
	let updatedItemSubTotal = 0
	let updatedCartTotalQuantity = 0
	let updatedCartGrandTotal = 0

	const existingProductIndex = updatedCartItems.findIndex((item) => {
		return item.productId.toString() === productId.toString()
	})

	if (updatedCartItems[existingProductIndex].quantity === 1) {
		updatedCartTotalQuantity = +this.totalQuantity - +qty

		updatedCartGrandTotal = +this.grandTotal - +productPrice

		updatedCartItems = updatedCartItems.filter((item) => {
			return item.productId.toString() !== productId.toString()
		})
	} else {
		updatedItemQuantity = +updatedCartItems[existingProductIndex].quantity - qty
		updatedCartItems[existingProductIndex].quantity = updatedItemQuantity

		updatedItemSubTotal =
			+updatedCartItems[existingProductIndex].subTotal - +productPrice
		updatedCartItems[existingProductIndex].subTotal = updatedItemSubTotal

		updatedCartTotalQuantity = +this.totalQuantity - +qty

		updatedCartGrandTotal = +this.grandTotal - +productPrice
	}

	this.totalQuantity = updatedCartTotalQuantity
	this.grandTotal = updatedCartGrandTotal
	this.cartItems = updatedCartItems
	return
}

cartSchema.methods.removeFromCart = function (productId) {
	let updatedCartItems = [...this.cartItems]
	let updatedTotalQuantity = 0
	let updatedCartGrandTotal = 0

	const existingProductIndex = updatedCartItems.findIndex((item) => {
		return item.productId.toString() === productId.toString()
	})

	updatedCartGrandTotal =
		+this.grandTotal - +this.cartItems[existingProductIndex].subTotal

	updatedTotalQuantity =
		+this.totalQuantity - +this.cartItems[existingProductIndex].quantity

	updatedCartItems = updatedCartItems.filter((item) => {
		return item.productId.toString() !== productId.toString()
	})

	this.totalQuantity = updatedTotalQuantity
	this.grandTotal = updatedCartGrandTotal
	this.cartItems = updatedCartItems
	return
}

cartSchema.methods.clearCart = function () {}

module.exports = mongoose.model('Cart', cartSchema)
