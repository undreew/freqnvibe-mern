import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './ProductScreen.css'

import {
	getProductDetails,
	getProductDetailsReset
} from '../../shared/redux/actions/product'
import { addToCartReset, addToCart } from '../../shared/redux/actions/cart'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/UIElements/ErrorModal'
import Button from '../../shared/FormsElements/Button'

const ProductScreen = (props) => {
	const productId = useParams().id
	const navigate = useNavigate()

	const [qty, setQty] = useState(1)

	const dispatch = useDispatch()

	const productDetails = useSelector((state) => state.getProductDetails)
	const { loading, error, product } = productDetails

	const auth = useSelector((state) => state.auth)
	const { isLoggedIn, userId, token } = auth.login

	useEffect(() => {
		if (product || !product) {
			dispatch(getProductDetails(productId))
		}
	}, [dispatch, productId])

	let item
	let image
	if (product) {
		item = product.product

		if (item) {
			let url = item.imageUrl
			image = url.substring(7, url.length)
		}
	}

	const addToCartState = useSelector((state) => state.addToCart)
	const {
		loading: cartLoading,
		success: cartSuccess,
		error: cartError
	} = addToCartState

	useEffect(() => {
		if (cartSuccess) {
			dispatch(addToCartReset())
			navigate('/cart')
		}
	}, [dispatch, cartSuccess])

	const handleAddToCart = () => {
		if (isLoggedIn) {
			dispatch(addToCart(token, userId, productId, qty))
		} else {
			navigate('/login')
		}
	}

	useEffect(() => {
		if (!product) {
			dispatch(getProductDetailsReset())
		}
	}, [product])

	const handleClearError = () => {
		dispatch(getProductDetailsReset())
		dispatch(addToCartReset())
	}

	return (
		<Fragment>
			{(!item || loading || cartLoading) && (
				<div className='center'>
					<LoadingSpinner asOverlay />
				</div>
			)}
			<ErrorModal error={error || cartError} onClear={handleClearError} />
			{item && (
				<div className='productscreen'>
					<div className='productscreen__left'>
						<div className='left__image'>
							<img
								src={`http://localhost:5000/images/${image}`}
								alt={item.name}
							/>
						</div>

						<div className='left__info'>
							<p className='left__name'>{item.name}</p>
							<p>Price: ${item.price}</p>
							<p>{item.description}</p>
						</div>
					</div>

					<div className='productscreen__right'>
						<div className='right__info'>
							<p>
								Price: <span>${item.price}</span>
							</p>
							<p>
								Status:{' '}
								<span>
									{item.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
								</span>
							</p>
							<p>
								Qty
								<select
									name=''
									id=''
									value={qty}
									onChange={(e) => setQty(e.target.value)}>
									{[...Array(item.countInStock).keys()].map((item) => {
										return (
											<option key={item + 1} value={item + 1}>
												{item + 1}
											</option>
										)
									})}
								</select>
							</p>
							<p>
								<Button type='button' onClick={handleAddToCart}>
									Add To Cart
								</Button>
							</p>
						</div>
					</div>
				</div>
			)}
		</Fragment>
	)
}

export default ProductScreen

// const ProductScreen = (props) => {
// 	const productId = useParams().id
// 	const navigate = useNavigate()

// 	const [qty, setQty] = useState(1)

// 	const dispatch = useDispatch()

// 	const productDetails = useSelector((state) => state.getProductDetails)
// 	const { loading, error, product } = productDetails

// 	const auth = useSelector((state) => state.auth)
// 	const { isLoggedIn, isAdmin, userId } = auth.login

// 	useEffect(() => {
// 		if (product || !product) {
// 			dispatch(getProductDetails(productId))
// 		}
// 	}, [dispatch, productId])

// 	let item
// 	let image
// 	if (product) {
// 		item = product.product

// 		if (item) {
// 			let url = item.imageUrl
// 			image = url.substring(7, url.length)
// 		}
// 	}

// 	const handleAddToCart = () => {
// 		if (isLoggedIn) {
// 			if (isAdmin) {
// 				navigate('/')
// 			} else {
// 				dispatch(addToCart(productId, qty))
// 				navigate('/cart')
// 			}
// 		} else {
// 			navigate('/login')
// 		}
// 	}

// 	useEffect(() => {
// 		if (!product) {
// 			dispatch(getProductDetailsReset())
// 		}
// 	}, [product])

// 	const handleClearError = () => {
// 		dispatch(getProductDetailsReset())
// 	}

// 	return (
// 		<Fragment>
// 			{(!item || loading) && (
// 				<div className='center'>
// 					<LoadingSpinner />
// 				</div>
// 			)}
// 			<ErrorModal error={error} onClear={handleClearError} />
// 			{item && (
// 				<div className='productscreen'>
// 					<div className='productscreen__left'>
// 						<div className='left__image'>
// 							<img
// 								src={`http://localhost:5000/images/${image}`}
// 								alt={item.name}
// 							/>
// 						</div>

// 						<div className='left__info'>
// 							<p className='left__name'>{item.name}</p>
// 							<p>Price: ${item.price}</p>
// 							<p>{item.description}</p>
// 						</div>
// 					</div>

// 					<div className='productscreen__right'>
// 						<div className='right__info'>
// 							<p>
// 								Price: <span>${item.price}</span>
// 							</p>
// 							<p>
// 								Status:{' '}
// 								<span>
// 									{item.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
// 								</span>
// 							</p>
// 							<p>
// 								Qty
// 								<select
// 									name=''
// 									id=''
// 									value={qty}
// 									onChange={(e) => setQty(e.target.value)}>
// 									{[...Array(item.countInStock).keys()].map((item) => {
// 										return (
// 											<option key={item + 1} value={item + 1}>
// 												{item + 1}
// 											</option>
// 										)
// 									})}
// 								</select>
// 							</p>
// 							<p>
// 								<button type='button' onClick={handleAddToCart}>
// 									Add To Cart
// 								</button>
// 							</p>
// 						</div>
// 					</div>
// 				</div>
// 			)}
// 		</Fragment>
// 	)
// }
