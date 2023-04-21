import React, { useState } from 'react'

const ScreenUrls = ({ newSettings, setNewSettings }) => {
	const [urls, setUrls] = useState({ url1: '', url2: '', url3: '', url4: '', url5: '' })

	const handleUrlChange = (e) => {
		e.preventDefault()
		setUrls((prevUrls) => ({ ...prevUrls, [e.target.name]: e.target.value }))
	}

	const handleSaveUrls = (e) => {
		e.preventDefault()

		setNewSettings((prevSettings) => ({ ...prevSettings, screenUrls: urls }))
	}

	return (
		<form className="form">
			<div className="input-container">
				<label htmlFor="">URL 1</label>
				<input type="text" name="url1" value={urls.url1} onChange={handleUrlChange} />
			</div>
			<div className="input-container">
				<label htmlFor="">URL 2</label>
				<input type="text" name="url2" value={urls.url2} onChange={handleUrlChange} />
			</div>
			<div className="input-container">
				<label htmlFor="">URL 3</label>
				<input type="text" name="url3" value={urls.url3} onChange={handleUrlChange} />
			</div>
			<div className="input-container">
				<label htmlFor="">URL 4</label>
				<input type="text" name="url4" value={urls.url4} onChange={handleUrlChange} />
			</div>
			<div className="input-container">
				<label htmlFor="">URL 5</label>
				<input type="text" name="url5" value={urls.url5} onChange={handleUrlChange} />
			</div>

			<button onClick={handleSaveUrls}>Save</button>
		</form>
	)
}

export default ScreenUrls
