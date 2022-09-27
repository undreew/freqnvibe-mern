import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate
} from 'react-router-dom'
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminProduct from './admin/pages/AdminProduct'
import AdminProducts from './admin/pages/AdminProducts'
import EditProduct from './admin/pages/EditProduct'
import Login from './auth/pages/Login'
import SignUp from './auth/pages/SignUp'

// PAGES
import CartScreen from './cart/pages/CartScreen'
import ProductScreen from './products/pages/ProductScreen'
import Navbar from './shared/Navigation/Navbar'
import Sidedrawer from './shared/Navigation/Sidedrawer'
import HomeScreen from './shared/pages/HomeScreen'
import Backdrop from './shared/UIElements/Backdrop'

const App = () => {
	const [isOpen, setIsOpen] = useState(false)

	const toggle = () => {
		setIsOpen((prevValue) => !prevValue)
	}

	const auth = useSelector((state) => state.auth)
	const { isLoggedIn, isAdmin } = auth.login

	let routes
	if (isLoggedIn && !isAdmin) {
		routes = (
			<Fragment>
				<Route path='/' element={<HomeScreen />} />
				<Route path='/product/:id' element={<ProductScreen />} />
				<Route path='/cart' element={<CartScreen />} />
				<Route
					path='*'
					element={<Navigate to='/' replace />} //this is a way to redirect
				/>
			</Fragment>
		)
	} else if (isLoggedIn && isAdmin) {
		routes = (
			<Fragment>
				{/* ADMIN DASHBOARD ROUTE */}
				{/* <Route path='/' element={<AdminDashboard />} /> */}
				{/* ADMIN PRODUCTS ROUTE */}
				<Route path='/admin/products' element={<AdminProducts />} />
				{/* ADMIN CREATE PRODUCT SCREEN ROUTE */}
				{/* <Route path='/admin/add-product' element={} /> */}
				{/* ADMIN PRODUCT SCREEN ROUTE */}
				<Route path='/admin/product/:id' element={<AdminProduct />} />
				{/* ADMIN EDIT PRODUCT SCREEN ROUTE */}
				<Route
					path='/admin/product/edit-product/:id'
					element={<EditProduct />}
				/>
				<Route
					path='*'
					element={<Navigate to='/admin/products' replace />} //this is a way to redirect
				/>
			</Fragment>
		)
	} else if (!isLoggedIn) {
		routes = (
			<Fragment>
				<Route path='/' element={<HomeScreen />} />
				<Route path='/product/:id' element={<ProductScreen />} />
				<Route path='/signup' element={<SignUp />} />
				<Route path='/login' element={<Login />} />
				<Route
					path='*'
					element={<Navigate to='/' replace />} //this is a way to redirect
				/>
			</Fragment>
		)
	}

	return (
		<Router>
			<Navbar onToggle={toggle} />
			<Sidedrawer show={isOpen} onToggle={toggle} />
			{isOpen && <Backdrop onToggle={toggle} />}
			<main>
				<Routes>{routes}</Routes>
			</main>
		</Router>
	)
}

export default App
