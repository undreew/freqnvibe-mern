import * as actions from '../constants/auth'

export const authReducer = (
	state = {
		loading: false,
		error: null,
		signup: { success: false, message: null },
		login: { isLoggedIn: false, userId: null, token: null, isAdmin: false }
	},
	action
) => {
	switch (action.type) {
		case actions.SIGNUP_REQUEST:
			return {
				...state,
				loading: true
			}

		case actions.SIGNUP_SUCCESS:
			return {
				...state,
				loading: false,
				signup: {
					success: true,
					message: action.payload
				}
			}

		case actions.SIGNUP_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			}

		case actions.SIGNUP_RESET:
			return {
				...state,
				loading: false,
				error: null,
				signup: {
					success: false,
					message: null
				}
			}

		case actions.LOGIN_REQUEST:
			return {
				...state,
				loading: true
			}

		case actions.LOGIN_SUCCESS:
			localStorage.setItem(
				'userData',
				JSON.stringify({
					isLoggedIn: !!action.payload.token,
					userId: action.payload.userId,
					token: action.payload.token,
					isAdmin: action.payload.isAdmin
				})
			)
			return {
				...state,
				loading: false,
				login: {
					isLoggedIn: !!action.payload.token,
					userId: action.payload.userId,
					token: action.payload.token,
					isAdmin: action.payload.isAdmin
				}
			}

		case actions.LOGIN_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			}

		case actions.LOGIN_RESET:
			return {
				...state,
				error: null
			}

		case actions.LOGOUT:
			localStorage.removeItem('userData')
			return {
				...state,
				loading: false,
				error: null,
				success: false,
				login: {
					isLoggedIn: false,
					userId: null,
					token: null,
					isAdmin: false
				}
			}

		default:
			return state
	}
}
