import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import OTPImage from '../assets/forgotpassword.jpg';
import '../style.css';
import Logo from './Logo';
import axios from 'axios';

function EnterOtp() {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [error, setError] = useState('');
  
  const { handleSubmit } = useForm();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [counter, setCounter] = useState(30);
  const [resendAvailable, setResendAvailable] = useState(false);

  useEffect(() => {
    if (counter > 0) {
      const timer = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setResendAvailable(true);
    }
  }, [counter]);

  const handleOtpChange = (value, index) => {
    if (!/^\d$/.test(value) && value !== '') return; // Only allow digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input field if the current one is filled
    if (value && index < 5) {
      document.getElementById(`otpInput-${index + 1}`).focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpCode = otp.join('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/verify-otp`, {
        email: state.email,
        otp: otpCode,
      });
      if (response.data) {
        navigate('/reset-password');
      } else {
        setError(response.data.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };
  

  const resendOtp = async (email) => {
    console.log("Email being sent to backend:", email); // Log the email
    setCounter(30);
    setResendAvailable(false);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/resendotp`, { email: state.email });
      if (response.status === 200) {
      if (response.data) {
        alert('OTP resent successfully.');
      } else {
        alert('Failed to resend OTP. Please try again later.');
      }
    }
    } catch (error) {
  
      console.error('Error resending OTP:', error);
      alert('Error resending OTP. Please try again later.');

    }
  };
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center">
      <div className="row w-100">
        <div className="left-side col-lg-6 d-flex justify-content-center align-items-center bg-light">
          <div>
            <div className='stack mt-5'>
              <Logo />
            </div>
            <img
              src={OTPImage}
              alt="Reset Password Illustration"
              className="EnterOtp-image mx-5 mt-5"
              style={{ maxWidth: '80%' }}
            />
          </div>
        </div>

        <div className="right-sec col-lg-6 d-flex justify-content-center align-items-center">
          <div className="EnterOtp-form-container p-4 shadow-lg bg-white rounded" style={{ width: '400px' }}>
            <h2 className="text-center">Enter OTP</h2>
            <p className="text-center">
              Please enter the 6-digit code sent to {state?.emailOrPhone || 'your email or phone'}.
            </p>
            <form onSubmit={handleSubmit(handleVerifyOtp)} className="d-flex flex-column align-items-center">
              <div className="otp-input-group d-flex justify-content-between mb-4" style={{ width: '100%' }}>
              {otp.map((value, index) => (
                  <input
                    key={index}
                    id={`otpInput-${index}`}
                    type="text"
                    maxLength="1"
                    className="form-control text-center"
                    value={value}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    style={{ width: '48px', height: '58px', fontSize: '24px' }}
                  />
                ))}
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 mb-3"
                style={{ backgroundColor: '#ee6a42', border: 'none' }}
              >
                Verify
              </button>

              <div className="d-flex justify-content-between w-100">
                <span>{counter > 0 ? `00:${String(counter).padStart(2, '0')}` : 'Time expired'}</span>
                {resendAvailable && (
                  <button onClick={resendOtp} className="btn btn-link p-0" style={{ color: '#ee6a42' }}>
                    Resend OTP
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnterOtp;
