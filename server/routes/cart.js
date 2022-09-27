const express = require('express')
const router = express.Router()

const cartController = require('../controllers/cart')

const isAuth = require('../middleware/isAuth')
const isUser = require('../middleware/isUser')

router.get('/:userId', cartController.getCart)

router.post('/', isAuth, isUser, cartController.addToCart)

router.patch('/', isAuth, isUser, cartController.reduceItemFromCart)

router.delete('/', isAuth, isUser, cartController.removeFromCart)

module.exports = router
