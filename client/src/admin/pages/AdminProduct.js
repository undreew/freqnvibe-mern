import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
	deleteProduct,
	deleteProductReset,
	getProductDetails,
	getProductDetailsReset,
	patchRestockProduct,
	patchRestockProductReset
} from '../../shared/redux/actions/product'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../shared/FormsElements/Button'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner'
import ErrorModal from '../../shared/UIElements/ErrorModal'

const AdminProduct = () => {
	const productId = useParams().id
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const productDetails = useSelector((state) => state.getProductDetails)
	const { loading, error, product } = productDetails

	const auth = useSelector((state) => state.auth)
	const { token } = auth.login

	const restockState = useSelector((state) => state.restockProduct)
	const {
		loading: restockLoading,
		error: restockError,
		success: restockSuccess
	} = restockState

	const deleteProductState = useSelector((state) => state.deleteProduct)
	const {
		loading: deleteLoading,
		error: deleteError,
		success: deleteSuccess
	} = deleteProductState

	useEffect(() => {
		if (!product || product) {
			dispatch(getProductDetails(productId))
		}
	}, [dispatch, productId])

	let item
	let image
	if (product) {
		item = product.product

		if (item) {
			let url = item.imageUrl
			image = url.substring(7, url.length)
		}
	}

	useEffect(() => {
		if (restockSuccess) {
			dispatch(getProductDetails(productId))
			dispatch(patchRestockProductReset())
		}
	}, [dispatch, restockSuccess])

	useEffect(() => {
		if (deleteSuccess) {
			navigate('/admin/products')
			dispatch(deleteProductReset())
		}
	}, [deleteSuccess])

	const handleDelete = () => {
		dispatch(deleteProduct(productId, token))
	}

	const [restockValue, setRestockValue] = useState(1)

	const handleRestock = (e) => {
		e.preventDefault()
		dispatch(patchRestockProduct(productId, token, restockValue))
	}

	const handleRestockChange = (e) => {
		setRestockValue((prevValue) => e.target.value)
	}

	const handleClearError = () => {
		dispatch(getProductDetailsReset())
		dispatch(patchRestockProductReset())
		dispatch(deleteProductReset())
	}

	return (
		<Fragment>
			{((!item && loading) || restockLoading || deleteLoading) && (
				<div className='center'>
					<LoadingSpinner />
				</div>
			)}
			<ErrorModal
				error={error || deleteError || restockError}
				onClear={handleClearError}
			/>
			{item && (
				<div className='productscreen'>
					<div className='productscreen__left'>
						<div className='left__image'>
							<img
								src={`http://localhost:5000/images/${image}`}
								alt={item.name}
							/>
						</div>

						<div className='left__info'>
							<p className='left__name'>{item.name}</p>
							<p>Price: ${item.price}</p>
							<p>{item.description}</p>
						</div>
					</div>

					<div className='productscreen__right'>
						<div className='right__info'>
							<p>
								Price: <span>${item.price}</span>
							</p>
							<p>
								Status:{' '}
								<span>
									{item.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
								</span>
							</p>
							<p>
								Qty: <span>{item.countInStock}</span>
							</p>
							<p className='right__info__edit'>
								<Button to={`/admin/product/edit-product/${productId}`}>
									Edit
								</Button>
								<Button type='button' onClick={handleDelete}>
									Delete
								</Button>
							</p>
							<p className='right__info__restock'>
								<form action='' onSubmit={handleRestock}>
									<select
										name=''
										id=''
										value={restockValue}
										onChange={handleRestockChange}>
										<option value='1'>1</option>
										<option value='2'>2</option>
										<option value='3'>3</option>
										<option value='4'>4</option>
										<option value='5'>5</option>
										<option value='6'>6</option>
										<option value='7'>7</option>
										<option value='8'>8</option>
										<option value='9'>9</option>
										<option value='10'>10</option>
									</select>
									<Button type='submit'>Restock</Button>
								</form>
							</p>
						</div>
					</div>
				</div>
			)}
		</Fragment>
	)
}

export default AdminProduct
