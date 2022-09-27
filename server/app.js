const MONGODB_URI = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.w3zpi.mongodb.net/${process.env.DB}`

const fs = require('fs')
const path = require('path')

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	)
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
	next()
})
app.use(express.json())
app.use(bodyParser.json())

const productRoutes = require('./routes/product')
const authRoutes = require('./routes/auth')
const cartRoutes = require('./routes/cart')

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)

app.use((error, req, res, next) => {
	if (req.file) {
		fs.unlink(req.file.path, (err) => {
			console.log(err)
		})
	}
	res.status(error.code || 500)
	res.json({ message: error.message || 'Unknown error occurred.' })
})

mongoose
	.connect(MONGODB_URI)
	.then((result) => {
		app.listen(process.env.PORT, () => {
			console.log(`Server running on port ${process.env.PORT}.`)
		})
	})
	.catch((err) => {
		console.log(err)
	})
