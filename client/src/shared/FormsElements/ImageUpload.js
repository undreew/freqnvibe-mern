import React, { useRef, useState } from 'react'
import Button from './Button'

import './ImageUpload.css'

const ImageUpload = (props) => {
	const [file, setFile] = useState()
	const [isValid, setIsValid] = useState(false)

	const handleImagePick = (e) => {
		let pickedFile
		let fileIsValid = isValid
		if (e.target.files && e.target.files.length === 1) {
			pickedFile = e.target.files[0]
			setFile(pickedFile)
			setIsValid(true)
			fileIsValid = true
		} else {
			setIsValid(false)
			fileIsValid = false
		}
		props.onInput(props.id, pickedFile, fileIsValid)
	}

	return (
		<div className='form-control'>
			<label htmlFor={props.id}>{props.label}</label>
			<div className='form-control__input'>
				<input
					id={props.id}
					type='file'
					accept='.jpg,.png,.jpeg'
					onChange={handleImagePick}
				/>
			</div>
		</div>
	)
}

export default ImageUpload
