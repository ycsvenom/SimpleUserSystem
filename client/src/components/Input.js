import React from 'react'

function Input(props) {
	const {
		imgClass,
		imgSrc,
		imgAlt,
		imgHtmlFor,
		inputClass,
		inputType,
		inputId,
		inputName,
		inputAutoComplete,
		inputPlaceholder,
		inputRequired,
		inputValue,
		inputOnChange
	} = props;
	return (
		<div>
			<img
				className={imgClass}
				src={imgSrc}
				alt={imgAlt}
				htmlFor={imgHtmlFor}
			></img>
			<input
				className={inputClass}
				type={inputType}
				id={inputId}
				name={inputName}
				autoComplete={inputAutoComplete}
				placeholder={inputPlaceholder}
				value={inputValue}
				// ref={passwordInputRef}
				onChange={inputOnChange}
				required={inputRequired}
			></input>
		</div>
	)
}

export default Input