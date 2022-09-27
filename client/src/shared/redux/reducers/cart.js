import * as actionTypes from '../constants/cart'

export const getCartReducer = (state = { userCart: {} }, action) => {
	switch (action.type) {
		case actionTypes.GET_CART_REQUEST:
			return {
				...state,
				loading: true
			}

		case actionTypes.GET_CART_SUCCESS:
			return {
				...state,
				loading: false,
				userCart: action.payload
			}

		case actionTypes.GET_CART_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			}

		case actionTypes.GET_CART_RESET:
			return {
				loading: false,
				error: null,
				userCart: { cartItems: [] }
			}

		default:
			return state
	}
}

export const addToCartReducer = (
	state = { loading: false, error: null, success: false },
	action
) => {
	switch (action.type) {
		case actionTypes.ADD_TO_CART_REQUEST:
			return {
				...state,
				loading: true
			}

		case actionTypes.ADD_TO_CART_SUCCESS:
			return {
				...state,
				loading: false,
				success: true
			}

		case actionTypes.ADD_TO_CART_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			}

		case actionTypes.ADD_TO_CART_RESET:
			return {
				...state,
				loading: false,
				error: null,
				success: false
			}

		default:
			return state
	}
}

export const reduceItemFromCartReducer = (
	state = { loading: false, error: null, success: false },
	action
) => {
	switch (action.type) {
		case actionTypes.REDUCE_ITEM_FROM_CART_REQUEST:
			return {
				...state,
				loading: true
			}

		case actionTypes.REDUCE_ITEM_FROM_CART_SUCCESS:
			return {
				...state,
				loading: false,
				success: true
			}

		case actionTypes.REDUCE_ITEM_FROM_CART_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			}

		case actionTypes.REDUCE_ITEM_FROM_CART_RESET:
			return {
				loading: false,
				error: null,
				success: false
			}

		default:
			return state
	}
}

export const removeFromCartReducer = (
	state = { loading: false, error: null, success: false },
	action
) => {
	switch (action.type) {
		case actionTypes.REMOVE_FROM_CART_REQUEST:
			return {
				...state,
				loading: true
			}

		case actionTypes.REMOVE_FROM_CART_SUCCESS:
			return {
				...state,
				loading: false,
				success: true
			}

		case actionTypes.REMOVE_FROM_CART_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			}

		case actionTypes.REMOVE_FROM_CART_RESET:
			return {
				...state,
				loading: false,
				error: null,
				success: false
			}

		default:
			return state
	}
}

// export const cartReducer = (state = { cartItems: [] }, action) => {
// 	switch (action.type) {
// 		case actionTypes.ADD_TO_CART_REQUEST:
// 			return {
// 				...state,
// 				loading: true
// 			}

// 		case actionTypes.ADD_TO_CART_SUCCESS:
// 			const product = action.payload

// 			const existingItem = state.cartItems.find(
// 				(item) => item.product === product.product
// 			)

// 			if (existingItem) {
// 				return {
// 					...state,
// 					cartItems: state.cartItems.map((item) =>
// 						item.product === existingItem.product ? product : item
// 					)
// 				}
// 			} else {
// 				return {
// 					...state,
// 					cartItems: [...state.cartItems, product]
// 				}
// 			}

// 		case actionTypes.ADD_TO_CART_FAIL:
// 			return {
// 				...state,
// 				loading: false,
// 				error: action.payload
// 			}

// 		case actionTypes.REMOVE_FROM_CART:
// 			return {
// 				...state,
// 				cartItems: state.cartItems.filter(
// 					(item) => item.product !== action.payload
// 				)
// 			}

// 		default:
// 			return state
// 	}
// }
