import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { ProtectedRoute } from './components/PrivateRoute'
import Dashboard from './pages/Dashboard'

const App = () => {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />

					<Route
						path=""
						element={
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/dashboard"
						element={
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</Router>
		</div>
	)
}

export default App
