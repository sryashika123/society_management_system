import React, { useState } from 'react';
import './LoginPage.css'; // Assuming you're styling the form externally
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Logo';
import axios from 'axios'; // Import Axios

export default function LoginPage() {
    // State hooks to manage form data
    const navigate = useNavigate(); // Declare navigate here
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    // Validation state
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState(''); // State for login error message
    const [loading, setLoading] = useState(false); // State for loading indicator

    // Validate email or phone (simple regex for email)
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;

        // Reset error messages
        setEmailError('');
        setPasswordError('');
        setLoginError(''); // Clear previous login errors

        // Validate email/phone input
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            isValid = false;
        }

        // Validate password length (at least 6 characters)
        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long.');
            isValid = false;
        }

        // If the form is valid, make an API call
        if (isValid) {
            setLoading(true); // Start loading
            try {
                const response = await axios.post('http://localhost:8000/api/users/login', { email, password });
                console.log('Login successful:', response.data);
                alert('Login successful!');
                navigate('/dashboard'); // or whatever your target route is

            } catch (error) {
                console.error('Login error:', error);
                if (error.response) {
                    setLoginError(error.response.data.message || 'password is not valid. Please try again.'); // Update error state
                } else {
                    setLoginError('An error occurred. Please try again later.');
                }
            } finally {
                setLoading(false); // End loading
            }
        }
    };

    return (
        <div className='container-fluid d-flex justify-content-center align-items-center'>
            <div className='row w-100'>
                <Logo />
                <div className='left-side col-lg-6 col-md-6 col-sm-12 text-center d-flex flex-column'>
                    <img
                        className='login-image mx-5 img-fluid mt-5'
                        src={require('../images/login.png')}
                        alt='login'
                    />
                </div>

                <div className='right-sec col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center align-items-center'>
                    <div className='login-form-container'>
                        <h2 className='text-left'>Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-12 mb-3 text-start">
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
                            </div>

                            <div className="row">
                                <div className="col-12 mb-3 text-start">
                                    <label htmlFor="password" className="form-label">
                                        Password<span className="text-danger">*</span>
                                    </label>
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
                            </div>

                            {loginError && <small className="text-danger">{loginError}</small>}

                            <div className="row">
                                <div className="col-md-6 text-start">
                                    <div className="form-check mb-3">
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
                                </div>

                                <div className="col-md-6 text-end">
                                    <Link to="/forgot-password" style={{ textDecoration: "none", color: '#ee6a42' }}>Forgot password?</Link>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary w-100" style={{ textDecoration: "none", backgroundColor: '#ee6a42', border: "none" }} disabled={loading}>
                                {loading ? 'Signing In...' : 'Sign In'}
                            </button>

                            <p className="text-center mt-3">
                                Don't have an account? <Link to="/register" style={{ textDecoration: "none", color: '#ee6a42' }}>Registration</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
