import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'

import { CSSTransition } from 'react-transition-group'

import './Modal.css'

import Backdrop from './Backdrop'

const ModalOverlay = (props) => {
	const content = (
		<div className={`modal ${props.className}`} style={props.style}>
			<header className={`modal__header ${props.headerClass}`}>
				<h2>{props.header}</h2>
			</header>

			<div className={`modal__content ${props.contentClass}`}>
				{props.children}
			</div>
			<footer className={`modal__footer ${props.footerClass}`}>
				{props.footer}
			</footer>
		</div>
	)

	return ReactDOM.createPortal(content, document.getElementById('modal'))
}

const Modal = (props) => {
	return (
		<Fragment>
			{props.isOpen && <Backdrop onToggle={props.onClick} />}
			<CSSTransition
				in={props.isOpen}
				mountOnEnter
				unmountOnExit
				timeout={200}
				classNames='modal'>
				<ModalOverlay {...props} />
			</CSSTransition>
		</Fragment>
	)
}

export default Modal
