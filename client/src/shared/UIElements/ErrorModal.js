import React from 'react'
import Button from '../FormsElements/Button'

import Modal from './Modal'

const ErrorModal = (props) => {
	return (
		<Modal
			onClick={props.onClear}
			header='An Error Occurred!'
			isOpen={!!props.error}
			footer={<Button onClick={props.onClear}>Okay</Button>}>
			<p>{props.error}</p>
		</Modal>
	)
}

export default ErrorModal
