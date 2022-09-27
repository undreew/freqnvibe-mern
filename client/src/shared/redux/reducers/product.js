import * as actionTypes from '../constants/product'

export const getProductsReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case actionTypes.GET_PRODUCTS_REQUEST:
			return {
				loading: true,
				products: []
			}

		case actionTypes.GET_PRODUCTS_SUCCESS:
			return {
				loading: false,
				products: action.payload
			}

		case actionTypes.GET_PRODUCTS_FAIL:
			return {
				loading: false,
				error: action.payload
			}

		case actionTypes.GET_PRODUCTS_RESET:
			return {
				...state,
				loading: false,
				error: null
			}

		default:
			return state
	}
}

export const getProductDetailsReducer = (state = { product: {} }, action) => {
	switch (action.type) {
		case actionTypes.GET_PRODUCT_DETAILS_REQUEST:
			return {
				loading: true
			}

		case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
			return {
				loading: false,
				product: action.payload
			}

		case actionTypes.GET_PRODUCT_DETAILS_FAIL:
			return {
				loading: false,
				error: action.payload
			}

		case actionTypes.GET_PRODUCT_DETAILS_RESET:
			return {
				...state,
				loading: false,
				error: null
			}

		default:
			return state
	}
}

export const postAddProductReducer = (
	state = { loading: false, error: null, success: false },
	action
) => {
	switch (action.type) {
		case actionTypes.POST_ADD_PRODUCT_REQUEST:
			return {
				...state,
				loading: true
			}

		case actionTypes.POST_ADD_PRODUCT_SUCCESS:
			return {
				...state,
				loading: false,
				success: true
			}

		case actionTypes.POST_ADD_PRODUCT_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			}

		case actionTypes.POST_ADD_PRODUCT_RESET:
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

export const patchEditProductReducer = (
	state = { loading: false, error: null, success: false },
	action
) => {
	switch (action.type) {
		case actionTypes.PATCH_EDIT_PRODUCT_REQUEST:
			return {
				...state,
				loading: true
			}

		case actionTypes.PATCH_EDIT_PRODUCT_SUCCESS:
			return {
				...state,
				loading: false,
				success: true
			}

		case actionTypes.PATCH_EDIT_PRODUCT_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			}

		case actionTypes.PATCH_EDIT_PRODUCT_RESET:
			return {
				loading: false,
				error: null,
				success: false
			}

		default:
			return state
	}
}

export const patchRestockProductReducer = (
	state = { loading: false, error: null, success: false },
	action
) => {
	switch (action.type) {
		case actionTypes.PATCH_RESTOCK_PRODUCT_REQUEST:
			return {
				...state,
				loading: true
			}

		case actionTypes.PATCH_RESTOCK_PRODUCT_SUCCESS:
			return {
				...state,
				loading: false,
				success: true
			}

		case actionTypes.PATCH_RESTOCK_PRODUCT_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			}

		case actionTypes.PATCH_RESTOCK_PRODUCT_RESET:
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

export const deleteProductReducer = (
	state = { loading: false, error: null, success: false },
	action
) => {
	switch (action.type) {
		case actionTypes.DELETE_PRODUCT_REQUEST:
			return {
				...state,
				loading: true
			}

		case actionTypes.DELETE_PRODUCT_SUCCESS:
			return {
				...state,
				loading: false,
				success: true
			}

		case actionTypes.DELETE_PRODUCT_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			}

		case actionTypes.DELETE_PRODUCT_RESET:
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
