import React, { useState } from 'react';
import './LoginPage.css'; // Assuming you're styling the form externally
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Logo';
import axios from 'axios'; // Import Axios

export default function LoginPage() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [loginError, setLoginError] = useState('');
	const [loading, setLoading] = useState(false);

	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let isValid = true;
		setEmailError('');
		setPasswordError('');
		setLoginError('');

		if (!validateEmail(email)) {
			setEmailError('Please enter a valid email address.');
			isValid = false;
		}

		if (password.length < 6) {
			setPasswordError('Password must be at least 6 characters long.');
			isValid = false;
		}

		if (isValid) {
			setLoading(true);
			try {
				const response = await axios.post('http://localhost:8000/api/users/login', { email, password });
				console.log('Login successful:', response.data);
				alert('Login successful!');
				navigate('/home');
			} catch (error) {
				console.error('Login error:', error);
				if (error.response) {
					setLoginError(error.response.data.message || 'password is not valid. Please try again.'); // Update error state
				} else {
					setLoginError('An error occurred. Please try again later.');
				}

				setLoginError(error.response?.data?.message || 'Login failed. Please try again.');

			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<div className="container-fluid d-flex align-items-center min-vh-100">
			<div className="row w-100">
				<Logo />
				<div className="left-side col-lg-6 col-md-6 col-12 d-flex flex-column justify-content-center align-items-center">
					<img
						className="login-image"
						src={require('../images/login.png')}
						alt="login"
						style={{ maxWidth: '80%' }}
					/>
				</div>
				<div className="right-sec col-lg-6 col-md-6 col-12 d-flex justify-content-center align-items-center">
					<div className="login-form-container p-4 shadow-lg bg-white rounded">
						<h2>Login</h2>
						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<label htmlFor="email" className="form-label">Email or Phone <span className="text-danger">*</span></label>
								<input
									type="text"
									className="form-control"
									id="email"
									placeholder="Enter Email or Phone"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
								{emailError && <small className="text-danger">{emailError}</small>}
							</div>

							<div className="mb-3">
								<label htmlFor="password" className="form-label">Password<span className="text-danger">*</span></label>
								<input
									type="password"
									className="form-control"
									id="password"
									placeholder="Enter Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
								{passwordError && <small className="text-danger">{passwordError}</small>}
							</div>

							{loginError && <small className="text-danger">{loginError}</small>}

							<div className="d-flex justify-content-between align-items-center mb-3">
								<div className="form-check">
									<input
										type="checkbox"
										className="form-check-input"
										id="rememberMe"
										checked={rememberMe}
										onChange={(e) => setRememberMe(e.target.checked)}
									/>
									<label className="form-check-label" htmlFor="rememberMe">
										Remember me
									</label>
								</div>
								<Link to="/forgot-password" className="text-decoration-none" style={{ color: '#ee6a42' }}>
									Forgot password?
								</Link>
							</div>

							<button
								type="submit"
								className="btn btn-primary w-100"
								disabled={loading}
								style={{ backgroundColor: '#ee6a42', border: 'none' }}
							>
								{loading ? 'Signing In...' : 'Sign In'}
							</button>

							<p className="text-center mt-3">
								Don't have an account? <Link to="/register" className="text-decoration-none " style={{ color: '#ee6a42' }}>Register</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
