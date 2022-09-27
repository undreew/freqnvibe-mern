import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import './Sidedrawer.css'
import Button from '../FormsElements/Button'
import { logout } from '../redux/actions/auth'
import { getCartReset } from '../redux/actions/cart'

const Sidedrawer = (props) => {
	const cart = useSelector((state) => state.cart)
	const { cartItems } = cart.userCart

	const dispatch = useDispatch()
	const auth = useSelector((state) => state.auth)
	const { isLoggedIn, isAdmin } = auth.login

	const handleLogout = () => {
		dispatch(getCartReset())
		dispatch(logout())
	}

	const getCartCount = () => {
		return cartItems.reduce((quantity, item) => +item.quantity + +quantity, 0)
	}

	const sideDrawerClass = ['sidedrawer']

	if (props.show) {
		sideDrawerClass.push('show')
	}
	const content = (
		<div className={sideDrawerClass.join(' ')}>
			<ul className='sidedrawer__links' onClick={props.onToggle}>
				{(!isLoggedIn || isLoggedIn) && !isAdmin && (
					<li>
						<Link to='/'>Shop</Link>
					</li>
				)}
				{isLoggedIn && !isAdmin && (
					<li>
						<Link to='/cart'>
							<i className='fas fa-shopping-cart'></i>
							<span>
								Cart{' '}
								<span className='sidedrawer__cartbadge'>{getCartCount()}</span>
							</span>
						</Link>
					</li>
				)}
				{!isLoggedIn && (
					<Fragment>
						<li>
							<Link to='/login'>Login</Link>
						</li>
						<li>
							<Link to='/signup'>Create an Account</Link>
						</li>
					</Fragment>
				)}
				{isLoggedIn && isAdmin && (
					<Fragment>
						<li>
							<Link to='/admin'>Admin Dashboard</Link>
						</li>
						<li>
							<Link to='/admin/products'>Products</Link>
						</li>
					</Fragment>
				)}
				{isLoggedIn && (
					<li>
						<Button type='button' danger auth onClick={handleLogout}>
							Logout
						</Button>
					</li>
				)}
			</ul>
		</div>
	)

	return ReactDOM.createPortal(content, document.getElementById('side-drawer'))
}

export default Sidedrawer
