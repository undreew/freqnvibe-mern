import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '../../shared/FormsElements/Button'
import Input from '../../shared/FormsElements/Input'
import RoleInput from '../../shared/FormsElements/RoleInput'
import useForm from '../../shared/hooks/useForm'
import { login, loginReset } from '../../shared/redux/actions/auth'
import { getCart } from '../../shared/redux/actions/cart'
import ErrorModal from '../../shared/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE
} from '../../util/inputValidatiors'

import './SignUp.css'

const Login = () => {
	const [formState, handleInput] = useForm({}, false)
	const dispatch = useDispatch()
	const auth = useSelector((state) => state.auth)
	const { loading, error, success } = auth
	const { userId } = auth.login

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(login(formState.inputs))
	}

	const handleClearError = () => {
		dispatch(loginReset())
	}

	return (
		<Fragment>
			{loading && (
				<div className=''>
					<LoadingSpinner asOverlay />
				</div>
			)}
			<ErrorModal error={error} onClear={handleClearError} />
			<div className='auth'>
				<form action='' className='auth__form' onSubmit={handleSubmit}>
					<h2>LOGIN</h2>

					<p>
						Please do not reuse a password you have used on another service or a
						password that is easily guessed.
					</p>
					<RoleInput label='ROLE' id='role' onInput={handleInput} />

					<Input
						placeholder='Enter your username.'
						label='USERNAME'
						id='username'
						element='input'
						type='text'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid username.'
						onInput={handleInput}
					/>

					<Input
						placeholder='Enter your password.'
						label='PASSWORD'
						id='password'
						element='input'
						type='password'
						validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(6)]}
						errorText='Please enter a valid password (atleast 6 characters).'
						onInput={handleInput}
					/>

					<div className='form__actions'>
						<Button type='submit' disabled={!formState.isValid}>
							LOGIN
						</Button>
						<Link to='/reset-password'>Forgot Your Password?</Link>
					</div>
				</form>
			</div>
		</Fragment>
	)
}

export default Login
