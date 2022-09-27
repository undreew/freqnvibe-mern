import {
	legacy_createStore as createStore,
	combineReducers,
	applyMiddleware
} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
	getCartReducer,
	addToCartReducer,
	removeFromCartReducer,
	reduceItemFromCartReducer
} from './reducers/cart'
import {
	deleteProductReducer,
	getProductDetailsReducer,
	getProductsReducer,
	patchEditProductReducer,
	patchRestockProductReducer,
	postAddProductReducer
} from './reducers/product'
import { authReducer } from './reducers/auth'

const reducer = combineReducers({
	cart: getCartReducer,
	addToCart: addToCartReducer,
	reduceItem: reduceItemFromCartReducer,
	removeFromCart: removeFromCartReducer,
	getProducts: getProductsReducer,
	getProductDetails: getProductDetailsReducer,
	addProduct: postAddProductReducer,
	editProduct: patchEditProductReducer,
	restockProduct: patchRestockProductReducer,
	deleteProduct: deleteProductReducer,
	auth: authReducer
})

const middleware = [thunk]

const cartFromLocalStorage = localStorage.getItem('cart')
	? JSON.parse(localStorage.getItem('cart'))
	: { cartItems: [] }

const storedUserData = localStorage.getItem('userData')
	? JSON.parse(localStorage.getItem('userData'))
	: { isLoggedIn: false, userId: null, token: null, isAdmin: false }

const INITIAL_STATE = {
	cart: {
		userCart: cartFromLocalStorage,
		loading: false,
		error: null
	},
	auth: {
		loading: false,
		error: null,
		signup: { success: false, message: null },
		login: storedUserData
	}
}

const store = createStore(
	reducer,
	INITIAL_STATE,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
