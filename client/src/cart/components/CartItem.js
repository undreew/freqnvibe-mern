import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../shared/FormsElements/Button'

import './CartItem.css'

const CartItem = ({ item, onQtyChange, onQtyDecrease, onRemove, quantity }) => {
	const imageUrl = item.imageUrl
	const image = imageUrl.substring(7, imageUrl.length)

	const handleDecreaseItemQuantity = () => {
		let removeQuantity = 1
		onQtyDecrease(item._id, item.price, removeQuantity)
	}

	const handleIncreaseItemQuantity = () => {
		let addQuantity = 1
		onQtyChange(item._id, addQuantity)
	}

	return (
		<div className='cartitem'>
			<div className='cartitem__image'>
				<img src={`http://localhost:5000/images/${image}`} alt={item.name} />
			</div>
			<Link to={`/product/${item._id}`} className='cartitem__name'>
				<p>{item.name}</p>
			</Link>

			<p className='cartitem__price'>${item.price}</p>

			<div className='cartitem__cutomize'>
				<Button type='button' inverse onClick={handleDecreaseItemQuantity}>
					-
				</Button>
				<p>{quantity}</p>
				<Button type='button' inverse onClick={handleIncreaseItemQuantity}>
					+
				</Button>
			</div>

			{/* <select
				name=''
				id=''
				className='cartitem__select'
				value={quantity}
				onChange={(e) => onQtyChange(item._id, e.target.value)}>
				{[...Array(item.countInStock).keys()].map((item) => {
					return (
						<option key={item + 1} value={item + 1}>
							{item + 1}
						</option>
					)
				})}
			</select> */}

			<button
				className='cartitem__deleteBtn'
				onClick={() => onRemove(item._id)}>
				<i className='fas fa-trash'></i>
			</button>
		</div>
	)
}

export default CartItem

// const CartItem = ({ item, onQtyChange, onRemove }) => {
// 	const imageUrl = item.imageUrl
// 	const image = imageUrl.substring(7, imageUrl.length)

// 	return (
// 		<div className='cartitem'>
// 			<div className='cartitem__image'>
// 				<img src={`http://localhost:5000/images/${image}`} alt={item.name} />
// 			</div>
// 			<Link to={`/product/${item.product}`} className='cartitem__name'>
// 				<p>{item.name}</p>
// 			</Link>

// 			<p className='cartitem__price'>${item.price}</p>

// 			<select
// 				name=''
// 				id=''
// 				className='cartitem__select'
// 				value={item.qty}
// 				onChange={(e) => onQtyChange(item.product, e.target.value)}>
// 				{[...Array(item.countInStock).keys()].map((item) => {
// 					return (
// 						<option key={item + 1} value={item + 1}>
// 							{item + 1}
// 						</option>
// 					)
// 				})}
// 			</select>

// 			<button
// 				className='cartitem__deleteBtn'
// 				onClick={() => onRemove(item.product)}>
// 				<i className='fas fa-trash'></i>
// 			</button>
// 		</div>
// 	)
// }
