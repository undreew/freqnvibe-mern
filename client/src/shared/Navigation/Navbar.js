import React, { Fragment } from 'react'

import './Navbar.css'

import { NavLink, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../FormsElements/Button'
import { logout } from '../redux/actions/auth'
import {
	addToCartReset,
	getCartReset,
	removeFromCartReset
} from '../redux/actions/cart'

const Navbar = (props) => {
	const cart = useSelector((state) => state.cart)
	const { cartItems } = cart.userCart

	const dispatch = useDispatch()
	const auth = useSelector((state) => state.auth)
	const { isLoggedIn, isAdmin } = auth.login

	const getCartCount = () => {
		return cartItems.reduce((quantity, item) => +item.quantity + +quantity, 0)
	}

	const handleLogout = () => {
		dispatch(getCartReset())
		dispatch(logout())
	}

	return (
		<nav className='navbar'>
			{/* LOGO */}
			<div className='navbar__logo'>
				<Link to='/'>F&V</Link>
			</div>

			{/* LINKS */}
			<ul className='navbar__links'>
				{(!isLoggedIn || isLoggedIn) && !isAdmin && (
					<li>
						<Link to='/'>Shop</Link>
					</li>
				)}
				{isLoggedIn && !isAdmin && (
					<li>
						<Link to='/cart' className='cart__link'>
							<i className='fas fa-shopping-cart'></i>
							<span>
								Cart <span className='cartlogo__badge'>{getCartCount()}</span>
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
						{/* <li>
							<Link to='/admin'>Admin Dashboard</Link>
						</li> */}
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

			{/* HAMBURGER MENU */}
			<div className='hamburger__menu' onClick={props.onToggle}>
				<div className=''></div>
				<div className=''></div>
				<div className=''></div>
			</div>
		</nav>
	)
}

export default Navbar
