import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.scss';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import DeleteAccount from './components/DeleteAccount';
import MathGame from './components/MathGame';

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route exact={true} path="/login" element={<Login />} />
				<Route exact={true} path="/signup" element={<Signup />} />
				<Route exact={true} path="/dashboard" element={<Dashboard />} />
				<Route exact={true} path="/math-game" element={<MathGame />} />
				<Route exact={true} path="/settings/delete-account" element={<DeleteAccount />} />
				{/* <Route index element={<Login />} />
					<Route path="*" element={<NoPage />} /> */}
			</Routes>
		</BrowserRouter>
	);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
