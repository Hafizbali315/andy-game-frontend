import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Switch from 'react-switch'
import api from './../utils/api'

import Instructions from '../components/Instructions'
import ScreenQuestions from '../components/ScreenQuestions'

const Dashboard = () => {
	console.log('import.meta.env.BASE_URL', import.meta.env.BASE_URL)
	const navigate = useNavigate()
	const userId = localStorage.getItem('userId')

	const [newSettings, setNewSettings] = useState({
		avatarToggler: false,
		instructionMessages: [],
		soundFile: null,
		screenQuestions: [],
		coinEarnings: 0,
		playLimit: 0,
	})

	const handleLogout = () => {
		localStorage.removeItem('token')
		navigate('/login')
	}

	const handleAvatarToggler = (checked) => {
		setNewSettings((prevSettings) => ({ ...prevSettings, avatarToggler: checked }))
	}

	const handleBgSound = (e) => {
		e.preventDefault()

		const file = e.target.files[0]
		setNewSettings((prevSettings) => ({ ...prevSettings, soundFile: file }))
	}

	const handleSettings = async () => {
		if (!newSettings.soundFile) {
			alert('Please upload a sound file')
		}

		const formData = new FormData()
		formData.append('userId', userId)
		formData.append('avatarToggler', newSettings.avatarToggler)
		formData.append('instructionMessages', JSON.stringify(newSettings.instructionMessages))
		formData.append('audioFile', newSettings.soundFile)
		formData.append('screenQuestions', JSON.stringify(newSettings.screenQuestions))
		formData.append('coinEarnings', newSettings.coinEarnings)
		formData.append('playLimit', newSettings.playLimit)

		try {
			const res = await api.post('/api/settings/user-settings', formData)
			if (res.data) {
				alert('Settings Saved Successfully')
			}
		} catch (error) {
			console.log('error', error)
		}
	}

	const fetchSettings = async () => {
		const res = await api.post(`/api/settings/user-settings/${userId}`)
		console.log('res.data', res.data)
	}

	useEffect(() => {
		fetchSettings()
	}, [])

	return (
		<div className="dashboard">
			<div className="header">
				<h2>Dashboard</h2>

				<button onClick={handleLogout}>Logout</button>
			</div>

			<div className="settings">
				<h2>Game Settings</h2>

				<div className="avatar-option">
					{/* Avatar Option Settings */}
					<h3>Can user customize the Avatar?</h3>
					<Switch
						onChange={handleAvatarToggler}
						checked={newSettings.avatarToggler}
						offColor="#ccc"
						onColor="#2196f3"
						onHandleColor="#fff"
						offHandleColor="#fff"
						height={24}
						width={48}
						uncheckedIcon={false}
						checkedIcon={false}
					/>
				</div>

				{/* Instruction Messages */}
				<Instructions newSettings={newSettings} setNewSettings={setNewSettings} />

				{/* Background Sound */}
				<div className="bg-sound">
					<h3>Upload Background Sound</h3>
					<input type="file" onChange={handleBgSound} accept="audio/*" />
				</div>

				{/* Setting what should be Seen on the screen */}
				<div className="screen-settings">
					<h3>What should be seen on the screen?</h3>
					<ScreenQuestions newSettings={newSettings} setNewSettings={setNewSettings} />
				</div>

				{/* Amount of Coins User Can Earn */}
				<div className="coins">
					<h3>Amount of Coins User Can Earn?</h3>
					<input
						type="number"
						value={newSettings.coinEarnings}
						onChange={(e) => setNewSettings((prevSettings) => ({ ...prevSettings, coinEarnings: e.target.value }))}
					/>
				</div>

				{/*Number of times user can play the game*/}
				<div className="game-play">
					<h3>Number of times user can play the game?</h3>
					<input
						type="number"
						value={newSettings.playLimit}
						onChange={(e) => setNewSettings((prevSettings) => ({ ...prevSettings, playLimit: e.target.value }))}
					/>
				</div>

				<button className="submit_settings_btn" onClick={handleSettings}>
					Save Settings
				</button>
			</div>
		</div>
	)
}

export default Dashboard
