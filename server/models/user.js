const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true
	},
	isAdmin: {
		type: Boolean,
		required: true
	},
	cartId: {
		type: Schema.Types.ObjectId,
		ref: 'Cart',
		required: false
	}
})

module.exports = mongoose.model('User', userSchema)
