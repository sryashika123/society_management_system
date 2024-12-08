// ForgotPassword.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import ForgotPasswordImage from '../assets/forgotpassword.jpg'; // Use the correct path for your image
import Logo from './Logo';
import '../style.css'
import axios from 'axios';

function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');


  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/forgot-password`, {
        email: data.email,
      });

      if (response.data) {
        navigate('/enter-otp', { state: { email: data.email } });
      } else {
        setServerError(response.data.message || 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error requesting OTP:', error);
      const errorMessage = error.response?.data?.message || 'Server error occurred. Please contact support.';
      setServerError(errorMessage);
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center min-vh-100">
      <div className="row w-100">
        {/* Left Section */}
        <div className="left-side col-lg-6 col-md-6 col-sm-12 align-items-center d-flex flex-column justify-content-center">
          <div >
            <div className='stack mt-5 '>

              <Logo />
            </div>
            <img
              className="ForgotPassword-image mx-5 mt-5"
              src={ForgotPasswordImage}
              alt="Forgot Password Illustration"
              style={{ maxWidth: '80%' }}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="right-sec col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
          <div className="forgot-form-container p-4 shadow-lg bg-white rounded">
            <h2>Forgot Password</h2>
            <p>Enter your email or phone, and we will send you an OTP to reset your password.</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label htmlFor="emailOrPhone" className="form-label">
                  Email or Phone <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.emailOrPhone ? 'is-invalid' : ''}`}  // Corrected here
                  id="emailOrPhone"
                  placeholder="Enter Email or Phone"
                  {...register('email', {
                    required: 'Email or phone is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$|^\d{10}$/,  // Validates email or 10-digit phone number
                      message: 'Enter a valid email or 10-digit phone number',
                    },
                  })}
                />
                {errors.emailOrPhone && (
                  <div className="invalid-feedback">{errors.emailOrPhone.message}</div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                style={{ backgroundColor: '#ee6a42', border: 'none' }}
              >
                Get OTP
              </button>

              <p className="text-center mt-3">
                <Link to="/" className="text-decoration-none" style={{ color: '#ee6a42' }}>
                  Back to login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;