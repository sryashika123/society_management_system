// Login.js
// import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import loginImage from '../assets/login.png';
import '../style.css';
import Logo from './Logo';
import axios from 'axios';
import { useState } from 'react';


function Login() {
	const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate(); // Use the hook here inside the component
  const [errors, setErrors] = useState('');

  const onSubmit = async (event) => {
	event.preventDefault();
  
	try {
	  const response = await fetch('http://localhost:8000/api/users/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(credentials),
	  });
  
	  const data = await response.json();
  
	  if (data.success) {
		console.log('Login successful!');
		
		// Save token and role to localStorage
		localStorage.setItem('token', data.token);
		localStorage.setItem('role', data.role);
  
		// Redirect based on role
		if (data.role === 'admin') {
		  navigate('/dashboard');
		} else if (data.role === 'resident') {
		  navigate('/events-and-participation');
		} else if (data.role === 'security') {
		  navigate('/visitor-tracking');
		}
	  } else {
		console.error('Login failed:', data.message);
	  }
	} catch (error) {
	  console.error('Error during login:', error);
	}
  };
  
  

	


	return (
		<div className="container-fluid d-flex align-items-center min-vh-100">
			<div className="row w-100">
				<div className="left-side col-lg-6 col-md-6 col-sm-12 justify-content-center align-items-center d-flex flex-column">
					<div className='stack mt-5 '>

						<Logo />
					</div>
					<div>
						<img
							className="login-image mx-5 mt-5"
							src={loginImage}
							alt="Login"
							style={{ maxWidth: '80%' }}
						/>
					</div>
				</div>

				<div className="right-sec col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
					<div className="login-form-container p-4 shadow-lg bg-white rounded">
						<h2>Login</h2>
						<form onSubmit={onSubmit}>
							<div className="mb-3">
								<label htmlFor="Email" className="form-label">
									Email or Phone <span className="text-danger">*</span>
								</label>
								<input
									type="text"
									className={`form-control ${errors.email ? 'is-invalid' : ''}`} // Corrected here
									id="Email"
									placeholder="Enter Email or Phone"
									value={credentials.email} 
									onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
								/>

								{errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
							</div>

							<div className="mb-3">
								<label htmlFor="password" className="form-label">
									Password <span className="text-danger">*</span>
								</label>
								<input
									type="password"
									className={`form-control ${errors.password ? 'is-invalid' : ''}`} // Corrected here
									id="password"
									placeholder="Enter Password"
									value={credentials.password}
									onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
								/>
								{errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
							</div>

							<div className="d-flex justify-content-between align-items-center mb-3">
								<div className="form-check">
									<input
										type="checkbox"
										className="form-check-input"
										id="rememberMe"
										
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
								style={{ backgroundColor: '#ee6a42', border: 'none' }}
							>
								Sign In
							</button>

							<p className="text-center mt-3">
								Don't have an account?{' '}
								<Link to="/signup" className="text-decoration-none" style={{ color: '#ee6a42' }}>
									Register
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;