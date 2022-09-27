const express = require('express')
const router = express.Router()

const authController = require('../controllers/auth')

const { body } = require('express-validator')
const isAuth = require('../middleware/isAuth')
const isAdmin = require('../middleware/isAdmin')

router.get('/', isAuth, isAdmin, authController.getAllUsers)

router.post(
	'/signup',
	[
		body('name', 'Please enter a valid name.').notEmpty().isString(),
		body('username', 'Please enter a valid username.').notEmpty().isString(),
		body('email', 'Please enter a valid email.')
			.notEmpty()
			.isEmail()
			.normalizeEmail(),
		body('password', 'Please enter a valid password (atleast 6 characters).')
			.notEmpty()
			.isAlphanumeric()
			.isLength({ min: 6 })
		// body('role', 'Please select a role.').notEmpty().isString()
	],
	authController.signup
)

router.post(
	'/login',
	[
		body('username', 'Please enter a valid username.').notEmpty().isString(),
		body('password', 'Please enter a valid password (atleast 6 characters).')
			.notEmpty()
			.isAlphanumeric()
			.isLength({ min: 6 })
	],
	authController.login
)

module.exports = router
