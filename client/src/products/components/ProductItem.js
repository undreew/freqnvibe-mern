import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '../../shared/FormsElements/Button'

import './ProductItem.css'

const ProductItem = (props) => {
	const auth = useSelector((state) => state.auth)
	const { isAdmin } = auth.login

	let imageUrl = props.imageUrl
	let image = imageUrl.substring(7, imageUrl.length)

	return (
		<div className='product'>
			<img src={`http://localhost:5000/images/${image}`} alt={props.name} />

			<div className='product__info'>
				<p className='info__name'>{props.name}</p>
				<p className='info__descripton'>
					{props.description.substring(0, 100)}...
				</p>
				<p className='info__price'>${props.price}</p>

				<Link
					to={isAdmin ? `/admin/product/${props.id}` : `/product/${props.id}`}
					className='info__button'>
					View
				</Link>
			</div>
		</div>
	)
}

export default ProductItem
