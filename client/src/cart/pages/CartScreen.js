import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '../../shared/FormsElements/Button'
import {
	addToCart,
	addToCartReset,
	getCart,
	getCartReset,
	reduceItemFromCart,
	reduceItemFromCartReset,
	removeFromCart,
	removeFromCartReset
} from '../../shared/redux/actions/cart'
import ErrorModal from '../../shared/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import CartItem from '../components/CartItem'

import './CartScreen.css'

const CartScreen = () => {
	const dispatch = useDispatch()

	const auth = useSelector((state) => state.auth)
	const { userId, token } = auth.login

	const cart = useSelector((state) => state.cart)
	const { loading: cartLoading, error: cartError } = cart
	const { cartItems } = cart.userCart

	const addToCartState = useSelector((state) => state.addToCart)
	const {
		loading: addLoading,
		error: addError,
		success: addSuccess
	} = addToCartState

	const reduceItemFromCartState = useSelector((state) => state.reduceItem)
	const {
		loading: reduceLoading,
		error: reduceError,
		success: reduceSuccess
	} = reduceItemFromCartState

	const removeFromCartState = useSelector((state) => state.removeFromCart)
	const {
		loading: removeLoading,
		error: removeError,
		success: removeSuccess
	} = removeFromCartState

	useEffect(() => {
		dispatch(getCart(userId))
	}, [])

	useEffect(() => {
		if (addSuccess) {
			dispatch(addToCartReset())
			dispatch(getCart(userId))
		}
	}, [dispatch, addSuccess])

	useEffect(() => {
		if (reduceSuccess) {
			dispatch(reduceItemFromCartReset())
			dispatch(getCart(userId))
		}
	}, [dispatch, reduceSuccess])

	useEffect(() => {
		if (removeSuccess) {
			dispatch(removeFromCartReset())
			dispatch(getCart(userId))
		}
	}, [dispatch, removeSuccess])

	const handleQtyChange = (productId, qty) => {
		dispatch(addToCart(token, userId, productId, qty))
	}

	const handleQtyDecrease = (productId, productPrice, qty) => {
		dispatch(reduceItemFromCart(token, userId, productId, productPrice, qty))
	}

	const handleRemoveFromCart = (productId) => {
		dispatch(removeFromCart(token, userId, productId))
	}

	const getCartCount = () => {
		return cartItems.reduce((quantity, item) => +item.quantity + +quantity, 0)
	}

	const getCartSubTotal = () => {
		return cartItems.reduce(
			(price, item) => +item.productId.price * +item.quantity + +price,
			0
		)
	}

	const handleClearError = () => {
		dispatch(getCartReset())
		dispatch(addToCartReset())
		dispatch(reduceItemFromCartReset())
		dispatch(removeFromCartReset())
		dispatch(getCart(userId))
	}

	const handleCheckOut = () => {
		console.log(cartItems)
	}

	return (
		<Fragment>
			{(cartLoading || addLoading || reduceLoading || removeLoading) && (
				<div className='center'>
					<LoadingSpinner asOverlay />
				</div>
			)}
			<ErrorModal
				error={cartError || addError || reduceError || removeError}
				onClear={handleClearError}
			/>
			<div className='cartscreen'>
				<div className='cartscreen__left'>
					<h2>Shopping Cart</h2>
					{cartItems.length === 0 ? (
						<div>
							Your cart is empty <Link to='/'>Go Back</Link>
						</div>
					) : (
						cartItems.map((item) => {
							return (
								<CartItem
									key={item.productId._id}
									item={item.productId}
									quantity={item.quantity}
									onQtyChange={handleQtyChange}
									onQtyDecrease={handleQtyDecrease}
									onRemove={handleRemoveFromCart}
								/>
							)
						})
					)}
				</div>

				<div className='cartscreen__right'>
					<div className='cartscreen__info'>
						<p>Subtotal ({getCartCount()}) items</p>
						<p>${getCartSubTotal().toFixed(2)}</p>
					</div>
					<div className=''>
						<Button type='button' onClick={handleCheckOut}>
							Proceed To Checkout
						</Button>
					</div>
				</div>
			</div>
		</Fragment>
	)
}

export default CartScreen

// const CartScreen = () => {
// 	const dispatch = useDispatch()

// 	const cart = useSelector((state) => state.cart)
// 	const { cartItems } = cart

// 	const handleQtyChange = (id, qty) => {
// 		dispatch(addToCart(id, qty))
// 	}

// 	const handleRemoveFromCart = (id) => {
// 		dispatch(removeFromCart(id))
// 	}

// 	const getCartCount = () => {
// 		return cartItems.reduce((qty, item) => +item.qty + +qty, 0)
// 	}

// 	const getCartSubTotal = () => {
// 		return cartItems.reduce(
// 			(price, item) => +item.price * +item.qty + +price,
// 			0
// 		)
// 	}

// 	return (
// 		<div className='cartscreen'>
// 			<div className='cartscreen__left'>
// 				<h2>Shopping Cart</h2>
// 				{cartItems.length === 0 ? (
// 					<div>
// 						Your cart is empty <Link to='/'>Go Back</Link>
// 					</div>
// 				) : (
// 					cartItems.map((item) => {
// 						return (
// 							<CartItem
// 								key={item.product}
// 								item={item}
// 								onQtyChange={handleQtyChange}
// 								onRemove={handleRemoveFromCart}
// 							/>
// 						)
// 					})
// 				)}
// 			</div>

// 			<div className='cartscreen__right'>
// 				<div className='cartscreen__info'>
// 					<p>Subtotal ({getCartCount()}) items</p>
// 					<p>${getCartSubTotal().toFixed(2)}</p>
// 				</div>
// 				<div className=''>
// 					<button>Proceed To Checkout</button>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }
