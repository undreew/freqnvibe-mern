import * as actionTypes from '../constants/cart.js'
import axios from 'axios'

export const getCart = (userId) => async (dispatch) => {
	try {
		dispatch({
			type: actionTypes.GET_CART_REQUEST
		})

		const response = await fetch(`http://localhost:5000/api/cart/${userId}`)

		const data = await response.json()

		if (!response.ok) {
			throw new Error(data.message)
		}

		dispatch({
			type: actionTypes.GET_CART_SUCCESS,
			payload: data.cart
		})
	} catch (error) {
		dispatch({
			type: actionTypes.GET_CART_FAIL,
			payload: error.toString()
		})
	}
}

export const getCartReset = () => (dispatch) => {
	dispatch({
		type: actionTypes.GET_CART_RESET
	})
}

export const addToCart =
	(token, userId, productId, qty) => async (dispatch) => {
		try {
			dispatch({
				type: actionTypes.ADD_TO_CART_REQUEST
			})

			const response = await fetch(`http://localhost:5000/api/cart/`, {
				method: 'POST',
				body: JSON.stringify({
					userId,
					productId,
					qty
				}),
				headers: {
					Authorization: 'Bearer ' + token,
					'Content-Type': 'application/json'
				}
			})
			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message)
			}

			dispatch({
				type: actionTypes.ADD_TO_CART_SUCCESS
			})
		} catch (error) {
			dispatch({
				type: actionTypes.ADD_TO_CART_FAIL,
				payload: error.toString()
			})
		}
	}

export const addToCartReset = () => (dispatch) => {
	dispatch({
		type: actionTypes.ADD_TO_CART_RESET
	})
}

export const reduceItemFromCart =
	(token, userId, productId, productPrice, qty) => async (dispatch) => {
		try {
			dispatch({
				type: actionTypes.REDUCE_ITEM_FROM_CART_REQUEST
			})

			const response = await fetch('http://localhost:5000/api/cart/', {
				method: 'PATCH',
				body: JSON.stringify({
					userId,
					productId,
					productPrice,
					qty
				}),
				headers: {
					Authorization: 'Bearer ' + token,
					'Content-Type': 'application/json'
				}
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message)
			}

			dispatch({
				type: actionTypes.REDUCE_ITEM_FROM_CART_SUCCESS
			})
		} catch (error) {
			dispatch({
				type: actionTypes.REDUCE_ITEM_FROM_CART_FAIL,
				payload: error.toString()
			})
		}
	}

export const reduceItemFromCartReset = () => (dispatch) => {
	dispatch({
		type: actionTypes.REDUCE_ITEM_FROM_CART_RESET
	})
}

export const removeFromCart =
	(token, userId, productId) => async (dispatch) => {
		try {
			dispatch({
				type: actionTypes.REMOVE_FROM_CART_REQUEST
			})

			const response = await fetch('http://localhost:5000/api/cart/', {
				method: 'DELETE',
				body: JSON.stringify({
					userId,
					productId
				}),
				headers: {
					Authorization: 'Bearer ' + token,
					'Content-Type': 'application/json'
				}
			})

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message)
			}

			dispatch({
				type: actionTypes.REMOVE_FROM_CART_SUCCESS
			})
		} catch (error) {
			dispatch({
				type: actionTypes.REMOVE_FROM_CART_FAIL,
				payload: error.toString()
			})
		}
	}

export const removeFromCartReset = () => (dispatch) => {
	dispatch({
		type: actionTypes.REMOVE_FROM_CART_RESET
	})
}

// export const addToCart = (productId, qty) => async (dispatch, getState) => {
// 	// const { data } = await axios.get(`/api/products/${id}`)

// 	const response = await fetch(
// 		`http://localhost:5000/api/products/${productId}`
// 	)
// 	const data = await response.json()

// 	if (!response.ok) {
// 		throw new Error(data.message)
// 	}

// 	dispatch({
// 		type: actionTypes.ADD_TO_CART_SUCCESS,
// 		payload: {
// 			product: data.product._id,
// 			name: data.product.name,
// 			imageUrl: data.product.imageUrl,
// 			price: data.product.price,
// 			countInStock: data.product.countInStock,
// 			qty
// 		}
// 	})

// 	localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
// }

// export const removeFromCart = (id) => (dispatch, getState) => {
// 	dispatch({
// 		type: actionTypes.REMOVE_FROM_CART,
// 		payload: id
// 	})
// 	localStorage.setItem('cart', JSON.stringify(getState().cart.cartItems))
// }
