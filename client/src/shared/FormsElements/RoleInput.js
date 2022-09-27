import React, { Fragment, useEffect, useReducer } from 'react'

import './Input.css'
import './RoleInput.css'

const roleInputReducer = (state, action) => {
	switch (action.type) {
		case 'ADMIN':
			return {
				value: action.payload,
				isValid: true
			}

		case 'USER':
			return {
				value: action.payload,
				isValid: true
			}

		default:
			return state
	}
}

const RoleInput = (props) => {
	const [roleState, dispatch] = useReducer(roleInputReducer, {
		value: 'User',
		isValid: true
	})

	const { id, onInput } = props
	const { value, isValid } = roleState

	useEffect(() => {
		props.onInput(id, value, isValid)
	}, [onInput, id, value, isValid])

	const handleChange = (e) => {
		if (e.target.value === 'Admin') {
			dispatch({ type: 'ADMIN', payload: e.target.value })
		} else {
			dispatch({ type: 'USER', payload: e.target.value })
		}
	}

	return (
		<Fragment>
			<div
				className={`form-control ${
					!roleState.isValid && roleState.isTouched && 'form-control__invalid'
				}`}>
				<label htmlFor={props.id}>{props.label}</label>
				<div className='form-control__input'>
					<select id={props.id} onChange={handleChange}>
						<option value='User'>User</option>
						<option value='Admin'>Admin</option>
					</select>
				</div>
			</div>
		</Fragment>
	)
}

export default RoleInput
