import React, { useEffect, useState } from 'react';
import './RegisterForm.css';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import Logo from './Logo';
import axios from 'axios';
import CreateSocietyForm from './Create_society';
export default function Register() {
    const navigate = useNavigate(); // Initialize useNavigate
    const [allsocites, setAllSocites] = useState([])

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        state: '',
        city: '',
        society: '',
        password: '',
        confirmPassword: ''
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    useEffect(() => {
        const fetchSocieties = async () => {
            const response = await axios.get('http://localhost:8000/api/users/getSociytey');
            setAllSocites(response.data);
        };
        fetchSocieties();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();


        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const payload = {
            ...formData,
            select_society: formData.society
        };

        console.log('Payload being sent:', payload);

        axios.post('http://localhost:8000/api/users/register', payload)
            .then(result => {
                console.log(result);
                alert('Registration successful');
                navigate('/');
            })
            .catch(err => {
                console.log(err);
            })
    }
    //     e.preventDefault();

    //     if (formData.password !== formData.confirmPassword) {
    //         alert('Passwords do not match');
    //         return;
    //     }

    //     const payload = {
    //         ...formData,
    //         select_society: formData.society
    //     };

    //     console.log('Payload being sent:', payload);

    //     try {
    //         const response = await axios.post('http://localhost:8000/api/users/register', payload);
    //         console.log('Response from server:', response.data);

    //         if (response.data) {
    //             console.log('Received data:', response.data);

    //             if (response.data.status === 'success') {
    //                 alert('Registration successful');
    //                 navigate('/'); // Use navigate to redirect on success
    //             } else {
    //                 alert('Registration failed: ' + (response.data.message || 'Unknown error'));
    //             }
    //         } else {
    //             alert('Unexpected response structure: ' + JSON.stringify(response.data));
    //         }
    //     } catch (error) {
    //         console.error('Error response:', error.response);

    //         if (error.response) {
    //             alert('Error: ' + (error.response.data.message || 'Registration failed. Please try again.'));
    //         } else if (error.request) {
    //             alert('No response received from server. Please try again later.');
    //         } else {
    //             alert('An error occurred: ' + error.message);
    //         }
    //     }
    // };

    return (
        <div className='container-fluid d-flex justify-content-center align-items-center min-vh-100'>
            <div className='row w-100'>
                <Logo />
                <div className='col-lg-6 col-md-6 col-sm-12 text-center d-flex align-items-center justify-content-center flex-column'>
                    <img
                        className='register-image img-fluid mt-5 mx-5'
                        src={require('../components/images/Ragister.png')}
                        alt='Registration'
                    />
                </div>

                <div className='right-sec col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center align-items-center'>
                    <div className='registration-form-container'>
                        <h2 className='text-center'>Registration</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="firstName" className="form-label">First Name<span className="text-danger">*</span></label>
                                    <input type="text" className="form-control"
                                        id="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="Enter First Name"
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="lastName" className="form-label">Last Name<span className="text-danger">*</span></label>
                                    <input type="text" className="form-control"
                                        id="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Enter Last Name"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="email" className="form-label">Email Address<span className="text-danger">*</span></label>
                                    <input type="email" className="form-control"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter Email Address"
                                        required
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="phone" className="form-label">Phone Number<span className="text-danger">*</span></label>
                                    <input type="tel" className="form-control"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="91+"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="country" className="form-label">Country<span className="text-danger">*</span></label>
                                    <input type="text" className="form-control"
                                        id="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        placeholder="Enter Country"
                                        required
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="state" className="form-label">State<span className="text-danger">*</span></label>
                                    <input type="text" className="form-control"
                                        id="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        placeholder="Enter State"
                                        required
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="city" className="form-label">City<span className="text-danger">*</span></label>
                                    <input type="text" className="form-control"
                                        id="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Enter City"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="society" className="form-label">
                                    Select Society<span className="text-danger">*</span>
                                </label>
                                <div className="input-group">
                                    <select
                                        className="form-select"
                                        id="society"
                                        value={formData.society}
                                        onChange={(e) => {
                                            const selectedValue = e.target.value;
                                            if (selectedValue === 'createNew') {
                                                const modal = new window.bootstrap.Modal(document.getElementById('createSocietyModal'));
                                                modal.show();
                                                e.target.value = '';
                                            } else {
                                                setFormData({ ...formData, society: selectedValue });
                                            }
                                        }}
                                        required
                                    >
                                        <option value="">Select Society</option>
                                        {allsocites?.map((society) => (
                                            <option key={society._id} value={society.societyName}>{society.societyName}</option>

                                        ))}
                                        <option value="createNew">Create new society</option>
                                    </select>
                                </div>
                            </div>

                            {/* <Create_society setAllSocites={setAllSocites} allsocites={allsocites}/> */}

                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label htmlFor="password" className="form-label">Password<span className="text-danger">*</span></label>
                                    <input type="password" className="form-control"
                                        id="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter Password"
                                        required
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-12 mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password<span className="text-danger">*</span></label>
                                    <input type="password" className="form-control"
                                        id="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Confirm Password"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-check mb-3">
                                <input type="checkbox" className="form-check-input" id="terms" required />
                                <label className="form-check-label" htmlFor="terms">
                                    I agree to all the Terms and <a href="/" style={{ textDecoration: "none", color: '#ee6a42' }}>Privacy Policies</a>.
                                </label>
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                                style={{
                                    background: 'linear-gradient(90deg, #FE512E 0%, #F09619 100%)',
                                    color: '#FFFFFF',
                                    fontWeight: 'bold',
                                    border: 'none'
                                }}
                            >
                                Register
                            </button>

                            <p className="text-center mt-3">
                                Already have an account? <Link to="/" style={{ textDecoration: "none", color: '#ee6a42' }}>Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <CreateSocietyForm setAllSocites={setAllSocites} allsocites={allsocites} />
        </div>
    );
}
