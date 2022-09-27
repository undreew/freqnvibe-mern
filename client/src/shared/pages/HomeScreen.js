import React, { Fragment, useEffect } from 'react'
import ProductItem from '../../products/components/ProductItem'

import './HomeScreen.css'

import { useSelector, useDispatch } from 'react-redux'
import {
	getProducts as listProducts,
	getProductsReset
} from '../redux/actions/product'
import LoadingSpinner from '../UIElements/LoadingSpinner'
import ErrorModal from '../UIElements/ErrorModal'
import { getCart } from '../redux/actions/cart'

const HomeScreen = () => {
	const dispatch = useDispatch()

	const getProducts = useSelector((state) => state.getProducts)
	const { products, loading, error } = getProducts

	const auth = useSelector((state) => state.auth)
	const { isLoggedIn, isAdmin, userId, token } = auth.login

	useEffect(() => {
		if (isLoggedIn && !isAdmin && !!token) {
			dispatch(getCart(userId))
		}
	}, [dispatch, isLoggedIn, isAdmin])

	useEffect(() => {
		dispatch(listProducts())
	}, [dispatch])

	let productItems
	if (products) {
		productItems = products.products
	}

	const handleClearError = () => {
		dispatch(getProductsReset())
	}

	return (
		<Fragment>
			{loading && (
				<div className=''>
					<LoadingSpinner />
				</div>
			)}
			<ErrorModal error={error} onClear={handleClearError} />
			<div className='homescreen'>
				<h2 className='homescreen__title'>Latest Products</h2>
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

export default HomeScreen
