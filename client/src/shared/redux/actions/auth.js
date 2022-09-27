import * as actions from '../constants/auth'
import axios from 'axios'

export const signup = (inputs) => async (dispatch) => {
	try {
		dispatch({ type: actions.SIGNUP_REQUEST })

		const response = await fetch('http://localhost:5000/api/auth/signup', {
			method: 'POST',
			body: JSON.stringify({
				name: inputs.name.value,
				username: inputs.username.value,
				email: inputs.email.value,
				password: inputs.password.value,
				role: inputs.role.value
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const data = await response.json()

		if (!response.ok) {
			throw new Error(data.message)
		}

		dispatch({ type: actions.SIGNUP_SUCCESS, payload: data })
	} catch (error) {
		console.log(error)
		dispatch({
			type: actions.SIGNUP_FAIL,
			payload: error.toString().substring(6, error.length)
		})
	}
}

export const signupReset = () => (dispatch) => {
	dispatch({
		type: actions.SIGNUP_RESET
	})
}

export const login = (inputs) => async (dispatch) => {
	try {
		dispatch({ type: actions.LOGIN_REQUEST })

		const response = await fetch('http://localhost:5000/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				role: inputs.role.value,
				username: inputs.username.value,
				password: inputs.password.value
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const data = await response.json()

		if (!response.ok) {
			throw new Error(data.message)
		}

		dispatch({ type: actions.LOGIN_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: actions.LOGIN_FAIL,
			payload: error.toString().substring(6, error.length)
		})
	}
}

export const loginReset = () => (dispatch) => {
	dispatch({
		type: actions.LOGIN_RESET
	})
}

export const logout = () => (dispatch) => {
	dispatch({
		type: actions.LOGOUT
	})
}
