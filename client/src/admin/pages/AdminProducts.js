import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductItem from '../../products/components/ProductItem'
import Button from '../../shared/FormsElements/Button'
import ImageUpload from '../../shared/FormsElements/ImageUpload'
import Input from '../../shared/FormsElements/Input'
import useForm from '../../shared/hooks/useForm'
import {
	getProducts as listProducts,
	getProductsReset,
	postAddProduct,
	postAddProductReset
} from '../../shared/redux/actions/product'
import ErrorModal from '../../shared/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import Modal from '../../shared/UIElements/Modal'
import { VALIDATOR_REQUIRE } from '../../util/inputValidatiors'

import './AdminProduct.css'

const AdminProducts = () => {
	const [isShow, setIsShow] = useState(false)

	const [formState, handleInput] = useForm({}, false)

	const dispatch = useDispatch()
	const getProducts = useSelector((state) => state.getProducts)

	const auth = useSelector((state) => state.auth)
	const { token } = auth.login

	const { products, loading, error } = getProducts

	const addProductState = useSelector((state) => state.addProduct)
	const {
		loading: addLoading,
		error: addError,
		success: addSuccess
	} = addProductState

	const handleModal = () => {
		setIsShow((prevValue) => !prevValue)
	}

	useEffect(() => {
		dispatch(listProducts())
	}, [dispatch])

	useEffect(() => {
		if (addSuccess) {
			handleModal()
			dispatch(postAddProductReset())
			dispatch(listProducts())
		}
	}, [addSuccess])

	useEffect(() => {
		if (addError) {
			handleModal()
		}
	}, [addError])

	let productItems
	if (products) {
		productItems = products.products
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(formState.inputs)
		dispatch(postAddProduct(formState.inputs, token))
	}

	const handleClearError = () => {
		dispatch(postAddProductReset())
		dispatch(getProductsReset())
	}

	return (
		<Fragment>
			{(loading || addLoading) && (
				<div className=''>
					<LoadingSpinner />
				</div>
			)}
			<ErrorModal error={error || addError} onClear={handleClearError} />
			<Modal isOpen={isShow} header='CREATE A PRODUCT' onClick={handleModal}>
				<form
					action=''
					className='createproduct__form'
					encType='multipart/form-data'
					onSubmit={handleSubmit}>
					<Input
						placeholder='Enter a name'
						label='NAME'
						id='name'
						element='input'
						type='text'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid name.'
						onInput={handleInput}
					/>
					<ImageUpload label='IMAGE' id='image' onInput={handleInput} />
					<Input
						placeholder='Enter a price'
						label='PRICE'
						id='price'
						element='input'
						type='number'
						step='0.01'
						min='1'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid price.'
						onInput={handleInput}
					/>
					<Input
						placeholder='Enter a stock value'
						label='STOCK'
						id='countInStock'
						element='input'
						type='number'
						step='1'
						min='1'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid stock value.'
						onInput={handleInput}
					/>
					<Input
						placeholder='Enter a description'
						label='DESCRIPTION'
						id='description'
						element='textarea'
						rows='6'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid name.'
						onInput={handleInput}
					/>
					<div className='form__actions'>
						<Button type='submit' disabled={!formState.isValid}>
							CREATE PRODUCT
						</Button>
					</div>
				</form>
			</Modal>
			<div className='homescreen'>
				<h2 className='homescreen__title'>
					Admin Products{' '}
					<Button type='button' inverse auth onClick={handleModal}>
						ADD PRODUCT
					</Button>
				</h2>
				<div className='homescreen__products'>
					{productItems &&
						productItems.map((item) => {
							return (
								<ProductItem
									key={item._id}
									id={item._id}
									name={item.name}
									imageUrl={item.imageUrl}
									price={item.price}
									description={item.description}
								/>
							)
						})}
				</div>
			</div>
		</Fragment>
	)
}

export default AdminProducts
