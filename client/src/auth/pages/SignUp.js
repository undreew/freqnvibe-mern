import React, { Fragment, useEffect } from 'react'
import Button from '../../shared/FormsElements/Button'
import Input from '../../shared/FormsElements/Input'
import useForm from '../../shared/hooks/useForm'
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE
} from '../../util/inputValidatiors'
import { useSelector, useDispatch } from 'react-redux'

import './SignUp.css'
import { signup, signupReset } from '../../shared/redux/actions/auth'
import { useNavigate } from 'react-router-dom'
import RoleInput from '../../shared/FormsElements/RoleInput'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/UIElements/ErrorModal'

const SignUp = () => {
	const dispatch = useDispatch()

	const auth = useSelector((state) => state.auth)
	const { loading, error, signup: signUpState } = auth
	const { success, message } = signUpState

	const [formState, handleInput] = useForm({}, false)
	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(signup(formState.inputs))
		console.log(formState.inputs)
	}

	useEffect(() => {
		if (success) {
			navigate('/login')
			dispatch(signupReset())
		}
	}, [success])

	const handleClearError = () => {
		dispatch(signupReset())
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
					<h2>SIGN UP</h2>

					<p>
						You will receive the confirmation mail to your email address
						associated with account. Please make sure to check your incoming
						email from us. Thank you.
					</p>
					<RoleInput label='ROLE' id='role' onInput={handleInput} />

					<Input
						placeholder='Enter a name.'
						label='NAME'
						id='name'
						element='input'
						type='text'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid name.'
						onInput={handleInput}
					/>

					<Input
						placeholder='Enter a username.'
						label='USERNAME'
						id='username'
						element='input'
						type='text'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid username.'
						onInput={handleInput}
					/>

					<Input
						placeholder='Enter a email.'
						label='EMAIL'
						id='email'
						element='input'
						type='email'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid email.'
						onInput={handleInput}
					/>

					<Input
						placeholder='Enter a password.'
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
							REGISTER
						</Button>
					</div>
				</form>
			</div>
		</Fragment>
	)
}

export default SignUp
