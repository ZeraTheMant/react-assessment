import React, { useState } from 'react';

const ClickableHeading = ({ name, clickFunction }) => {
	const [ascending, setAscending] = useState(true)
	
	const changeDisplayOrder = () => {
		clickFunction(ascending)
		setAscending(!ascending)
	}
	
	return (
		<th onClick={changeDisplayOrder} className="clickable-heading">{name}</th>
	)
}

export default ClickableHeading
