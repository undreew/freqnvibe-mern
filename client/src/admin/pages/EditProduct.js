import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../shared/FormsElements/Button'
import Input from '../../shared/FormsElements/Input'
import useForm from '../../shared/hooks/useForm'
import {
	getProductDetails,
	patchEditProduct,
	patchEditProductReset
} from '../../shared/redux/actions/product'
import ErrorModal from '../../shared/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE
} from '../../util/inputValidatiors'

import './EditProduct.css'

const EditProduct = () => {
	const productId = useParams().id

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const auth = useSelector((state) => state.auth)
	const { token } = auth.login

	const productDetails = useSelector((state) => state.getProductDetails)
	const { loading, error, product } = productDetails

	const editProduct = useSelector((state) => state.editProduct)
	const {
		loading: editLoading,
		error: editError,
		success: editSuccess
	} = editProduct

	const [formState, handleInput] = useForm({}, false)

	useEffect(() => {
		dispatch(getProductDetails(productId))
	}, [dispatch, getProductDetails, productId])

	useEffect(() => {
		if (editSuccess) {
			dispatch(patchEditProductReset())
			navigate(`/admin/product/${productId}`)
		}
	}, [editSuccess])

	const handleSubmit = (e) => {
		e.preventDefault()
		dispatch(patchEditProduct(productId, token, formState.inputs))
	}

	const handleClearError = () => {
		dispatch(patchEditProductReset())
	}

	return (
		<Fragment>
			{(loading || editLoading) && (
				<div className='center'>
					<LoadingSpinner />
				</div>
			)}
			<ErrorModal error={error || editError} onClear={handleClearError} />
			{!loading && product.product && (
				<div className='editproduct'>
					<form action='' className='editproduct__form' onSubmit={handleSubmit}>
						<h2>EDIT PRODUCT</h2>

						<Input
							placeholder='Enter a name'
							label='Name'
							id='name'
							element='input'
							type='text'
							validators={[VALIDATOR_REQUIRE()]}
							errorText='Please enter a valid name.'
							onInput={handleInput}
							initialValue={product.product.name}
							initialValid={true}
						/>

						<Input
							placeholder='Enter a description'
							label='Description'
							id='description'
							element='textarea'
							rows='6'
							validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
							errorText='Please enter a valid description.'
							onInput={handleInput}
							initialValue={product.product.description}
							initialValid={true}
						/>

						<div className='form__actions'>
							<Button type='submit' disabled={!formState.isValid}>
								UPDATE PRODUCT
							</Button>
						</div>
					</form>
				</div>
			)}
		</Fragment>
	)
}

export default EditProduct
