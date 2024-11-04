import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import ForgotPasswordImage from '../images/forgot.png';
import './ResetPassword.css';
import Logo from '../Logo';
import axios from 'axios';

export default function ResetPassword() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const { state } = useLocation();

    // State for passwords and error message
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const email = state?.email; 
     // Check if email is defined
    

    const onSubmit = async (data) => {
        const { password, confirmPassword } = data;
    
        setPasswordError('');
    
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }


        // Debug: Check the payload before sending
        console.log('Payload:', { email, password  });
    
        try {
            const response = await axios.post('http://localhost:8000/api/users/reset-password', {
                email,
                password,
               
            });
            if (response.data) {
                navigate('/', { state: { email } });
            }
        } catch (error) {
            // Improved error handling
            console.error("Error:", error.response ? error.response.data : error.message);
            setPasswordError(error.response?.data?.msg || 'Error resetting password.');
        }
    };
    

    return (
        <div className="container-fluid d-flex align-items-center min-vh-100">
            <div className="row w-100">
                <Logo />
                <div className="left-side col-lg-6 col-md-6 col-sm-12 align-items-center d-flex flex-column justify-content-center">
                    <div>
                        <img
                            className="ForgotPassword-image mx-5 mt-5"
                            src={ForgotPasswordImage}
                            alt="Forgot Password Illustration"
                            style={{ maxWidth: '80%' }}
                        />
                    </div>
                </div>
                <div className="right-sec col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center align-items-center ">
                    <div className="reset-form-container">
                        <h2 className="text-left">Reset Password</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="col-md-12 mb-3 text-start">
                                    <label htmlFor="password" className="form-label">
                                        New Password<span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className="form-control"
                                            id="Resetpassword"
                                            placeholder="Enter Password"
                                            {...register("password", { required: true })}
                                            required
                                        />
                                        <span
                                            className="input-group-text"
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>
                                    {errors.password && <small className="text-danger">Password is required.</small>}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 mb-3 text-start">
                                    <label htmlFor="confirmPassword" className="form-label">
                                        Confirm Password<span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            className="form-control"
                                            id="ResetNewpassword"
                                            placeholder="Confirm Password"
                                            {...register("confirmPassword", { required: true })}
                                            required
                                        />
                                        <span
                                            className="input-group-text"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>
                                    {errors.confirmPassword && <small className="text-danger">Confirm Password is required.</small>}
                                    {passwordError && <small className="text-danger">{passwordError}</small>}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                style={{ textDecoration: "none", backgroundColor: '#ee6a42', border: "none" }}
                            >
                                Reset Password
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
