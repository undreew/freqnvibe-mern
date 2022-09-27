import * as actionTypes from '../constants/product'
import axios from 'axios'

export const getProducts = () => async (dispatch) => {
	try {
		dispatch({ type: actionTypes.GET_PRODUCTS_REQUEST })

		// const { data } = await axios.get('/api/products')

		const response = await fetch(`http://localhost:5000/api/products`)
		const data = await response.json()

		if (!response.ok) {
			throw new Error(data.message)
		}

		dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: actionTypes.GET_PRODUCTS_FAIL,
			payload: error.toString()
		})
	}
}

export const getProductsReset = () => (dispatch) => {
	dispatch({
		type: actionTypes.GET_PRODUCTS_RESET
	})
}

export const getProductDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST })

		// const { data } = await axios.get(`/api/products/${id}`)

		const response = await fetch(`http://localhost:5000/api/products/${id}`)
		const data = await response.json()

		if (!response.ok) {
			throw new Error(data.message)
		}

		dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: actionTypes.GET_PRODUCT_DETAILS_FAIL,
			payload: error.toString()
		})
	}
}

export const getProductDetailsReset = () => (dispatch) => {
	dispatch({
		type: actionTypes.GET_PRODUCT_DETAILS_RESET
	})
}

export const postAddProduct = (inputs, token) => async (dispatch) => {
	try {
		dispatch({ type: actionTypes.POST_ADD_PRODUCT_REQUEST })

		// JSON.stringify({
		// 	name: inputs.name.value,
		// 	price: inputs.price.value,
		// 	countInStock: inputs.countInStock.value,
		// 	description: inputs.description.value
		// })

		const formData = new FormData()
		formData.append('name', inputs.name.value)
		formData.append('price', inputs.price.value)
		formData.append('countInStock', inputs.countInStock.value)
		formData.append('description', inputs.description.value)
		formData.append('image', inputs.image.value)

		const response = await fetch('http://localhost:5000/api/products/', {
			method: 'POST',
			body: formData,
			headers: {
				Authorization: 'Bearer ' + token
			}
		})

		const data = await response.json()

		if (!response.ok) {
			throw new Error(data.message)
		}

		dispatch({
			type: actionTypes.POST_ADD_PRODUCT_SUCCESS
		})
	} catch (error) {
		dispatch({
			type: actionTypes.POST_ADD_PRODUCT_FAIL,
			payload: error.toString()
		})
	}
}

export const postAddProductReset = () => (dispatch) => {
	dispatch({
		type: actionTypes.POST_ADD_PRODUCT_RESET
	})
}

export const patchEditProduct = (id, token, inputs) => async (dispatch) => {
	try {
		dispatch({ type: actionTypes.PATCH_EDIT_PRODUCT_REQUEST })

		const response = await fetch(`http://localhost:5000/api/products/${id}`, {
			method: 'PATCH',
			body: JSON.stringify({
				name: inputs.name.value,
				description: inputs.description.value
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
			type: actionTypes.PATCH_EDIT_PRODUCT_SUCCESS
		})
	} catch (error) {
		dispatch({
			type: actionTypes.PATCH_EDIT_PRODUCT_FAIL,
			payload: error.toString()
		})
	}
}

export const patchEditProductReset = () => (dispatch) => {
	dispatch({
		type: actionTypes.PATCH_EDIT_PRODUCT_RESET
	})
}

export const patchRestockProduct =
	(id, token, restockValue) => async (dispatch) => {
		try {
			dispatch({
				type: actionTypes.PATCH_RESTOCK_PRODUCT_REQUEST
			})

			const response = await fetch(
				`http://localhost:5000/api/products/restock/${id}`,
				{
					method: 'PATCH',
					body: JSON.stringify({
						countInStock: restockValue
					}),
					headers: {
						Authorization: 'Bearer ' + token,
						'Content-Type': 'application/json'
					}
				}
			)

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message)
			}

			dispatch({
				type: actionTypes.PATCH_RESTOCK_PRODUCT_SUCCESS
			})
		} catch (error) {
			dispatch({
				type: actionTypes.PATCH_RESTOCK_PRODUCT_FAIL,
				payload: error.toString()
			})
		}
	}

export const patchRestockProductReset = () => (dispatch) => {
	dispatch({
		type: actionTypes.PATCH_RESTOCK_PRODUCT_RESET
	})
}

export const deleteProduct = (id, token) => async (dispatch) => {
	try {
		dispatch({
			type: actionTypes.DELETE_PRODUCT_REQUEST
		})

		const response = await fetch(`http://localhost:5000/api/products/${id}`, {
			method: 'DELETE',
			body: null,
			headers: {
				Authorization: 'Bearer ' + token
			}
		})

		const data = await response.json()

		if (!response.ok) {
			throw new Error(data.message)
		}

		dispatch({
			type: actionTypes.DELETE_PRODUCT_SUCCESS
		})
	} catch (error) {
		dispatch({
			type: actionTypes.DELETE_PRODUCT_FAIL,
			payload: error.toString()
		})
	}
}

export const deleteProductReset = () => (dispatch) => {
	dispatch({
		type: actionTypes.DELETE_PRODUCT_RESET
	})
}
