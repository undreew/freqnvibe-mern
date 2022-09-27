const express = require('express')
const router = express.Router()

const productController = require('../controllers/product')

const { body } = require('express-validator')
const isAuth = require('../middleware/isAuth')
const isAdmin = require('../middleware/isAdmin')
const fileUpload = require('../middleware/fileUpload')

// GET all products from DB
// GET /api/products/
// public
router.get('/', productController.getAllProducts)

// GET a product by from DB
// GET /api/products/:productId
// public
router.get('/:productId', productController.getProductById)

// JWT AUTHENTICATION NEEDED FOR THIS ROUTE
// isAuth middleware, isAdmin middleware
// ONLY FOR AUTHENTICATED ADMINS

// NEEDS IMAGE UPLOAD
router.post(
	'/',
	isAuth,
	isAdmin,
	fileUpload.single('image'),
	[
		(body('name').notEmpty().isString(),
		body('description').notEmpty().isString().isLength({ min: 6 }),
		body('price').notEmpty().isNumeric(),
		body('countInStock').notEmpty().isNumeric())
	],
	productController.postProduct
)

// NEEDS IMAGE UPLOAD
router.patch(
	'/:productId',
	isAuth,
	isAdmin,
	[
		body('name').notEmpty().isString(),
		body('description').notEmpty().isString().isLength({ min: 6 })
	],
	productController.patchProduct
)

router.patch(
	'/restock/:productId',
	isAuth,
	isAdmin,
	[body('countInStock').notEmpty().isNumeric()],
	productController.patchRestockProduct
)

router.delete('/:productId', isAuth, isAdmin, productController.deleteProduct)

module.exports = router
