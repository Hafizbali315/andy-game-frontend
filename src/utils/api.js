import axios from 'axios'

const api = axios.create({
	baseURL: 'https://andy-game-backend.herokuapp.com',
})

export default api
