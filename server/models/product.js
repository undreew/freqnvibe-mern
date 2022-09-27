const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	countInStock: {
		type: Number,
		required: true
	},
	imageUrl: {
		type: String,
		required: false
	}
})

module.exports = mongoose.model('Product', productSchema)
