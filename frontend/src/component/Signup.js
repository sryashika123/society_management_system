import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../index.css';
import signupimg2 from '../assets/signup-img2.png';
import signupimg from '../assets/signup-img.png';
import { HiMiniEyeSlash } from "react-icons/hi2";
import { IoEyeSharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import axios from 'axios';

export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { register: registerNewSociety, handleSubmit: handleNewSubmit, formState: { errors: newSocietyErrors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [societies, setSocieties] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

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



    // Fetch Societies on Load
    useEffect(() => {
        const fetchSocieties = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/v2/getSociytey`);
                setSocieties(response.data);
            } catch (error) {
                console.error("Error fetching societies:", error.message);
            }
        };
        fetchSocieties();
    }, []);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);
    const toggleTermsAccepted = () => setTermsAccepted(!termsAccepted);



    const onSubmit = async (data) => {
        console.log("Form Data:", data);

        const { society, ...rest } = data;  // Destructure to remove 'society' and keep the rest
        const payload = {
            ...rest,               // Spread the remaining fields
            select_society: society, // Add 'select_society' field
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, payload);
            alert("User registered successfully!");
            // console.log(response.data);
            console.log("Registration Response:", response); // Log response to verify success
            navigate("/"); // Redirect to login page
        } catch (error) {
            alert("Registration failed: " + (error.response?.data.message || error.message));
            console.error(error);
        }
    };

    const handleNewSocietySubmit = async (newData) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/v2/createSociety`, newData);

            alert("Society created successfully!");

            // Update the society list and pre-select the new society
            setSocieties((prevSocieties) => {
                const updatedSocieties = [...prevSocieties, response.data?.society];
                setFormData((prev) => ({ ...prev, society: response.data?.society?.societyName })); // Set the newly created society as selected
                return updatedSocieties;
            });

            setShowForm(false); // Close the form modal
        } catch (error) {
            console.error("Failed to create society:", error.response?.data || error.message);
            alert("Failed to create society: " + (error.response?.data.message || error.message));
        }
    };





    const handleCancel = () => {
        setShowForm(false);
    };

    return (
        <div className="d-flex flex-column flex-md-row min-vh-100 position-relative">
            {/* Left Side: Image */}
            <div className="signup-img  d-flex flex-column align-items-left" style={{ width: "950px" }}>


                <div className='stack mt-5'>
                    <Logo />
                </div>


                {/* Center the image vertically in the remaining space */}
                <div className='d-flex align-items-center justify-content-center flex-grow-1'>
                    <img
                        src={showForm ? signupimg2 : signupimg}
                        alt="Society"
                        style={{ opacity: showForm ? 0.6 : 1 }}
                    />
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="signup-form  d-flex align-items-center justify-content-center py-5" style={{ opacity: showForm ? 0.6 : 1, width: "950px" }}>
                <div className="form bg-white p-4 rounded shadow">
                    <h2 className="h4 font-weight-bold mb-4 text-left">Registration</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* First Name, Last Name */}
                        <div className="row">
                            <div className="col">
                                <div className="form-group">
                                    <label>First Name <span className="text-danger">*</span></label>
                                    <input
                                        type='text'
                                        className="form-control"
                                        placeholder='Enter First Name'
                                        {...register('firstName', { required: 'First Name is required' })}
                                    />
                                    {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}
                                </div>
                            </div>

                            <div className="col">
                                <div className="form-group">
                                    <label>Last Name <span className="text-danger">*</span></label>
                                    <input
                                        type='text'
                                        className="form-control"
                                        placeholder='Enter Last Name'
                                        {...register('lastName', { required: 'Last Name is required' })}
                                    />
                                    {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Email Address, Phone Number */}
                        <div className="row mt-3">
                            <div className="col">
                                <div className="form-group">
                                    <label>Email Address <span className="text-danger">*</span></label>
                                    <input
                                        className="form-control"
                                        placeholder='Enter Email Address'
                                        type="email"
                                        {...register('email', { required: 'Email is required' })}
                                    />
                                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                                </div>
                            </div>

                            <div className="col">
                                <div className="form-group">
                                    <label>Phone Number <span className="text-danger">*</span></label>
                                    <input
                                        type='number'
                                        className="form-control"
                                        placeholder='Enter Phone Number'
                                        {...register('phone', { required: 'Phone Number is required' })}
                                    />
                                    {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber.message}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Country, State, City */}
                        <div className="row mt-3">
                            <div className="col">
                                <div className="form-group">
                                    <label>Country <span className="text-danger">*</span></label>
                                    <input
                                        type='text'
                                        className="form-control"
                                        placeholder='Enter Country'
                                        {...register('country', { required: 'Country is required' })}
                                    />
                                    {errors.country && <p className="text-danger">{errors.country.message}</p>}
                                </div>
                            </div>

                            <div className="col">
                                <div className="form-group">
                                    <label>State <span className="text-danger">*</span></label>
                                    <input
                                        type='text'
                                        className="form-control"
                                        placeholder='Enter State'
                                        {...register('state', { required: 'State is required' })}
                                    />
                                    {errors.state && <p className="text-danger">{errors.state.message}</p>}
                                </div>
                            </div>

                            <div className="col">
                                <div className="form-group">
                                    <label>City <span className="text-danger">*</span></label>
                                    <input
                                        type='text'
                                        className="form-control"
                                        placeholder='Enter City'
                                        {...register('city', { required: 'City is required' })}
                                    />
                                    {errors.city && <p className="text-danger">{errors.city.message}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Select Role */}
                        {/* <div className="form-group mt-3">
                            <label>Select Role <span className="text-danger">*</span></label>
                            <select
                                className="form-control"
                                {...register('role', { required: 'Society role is required' })}
                            >
                                <option value="Admin">Admin</option>
                                <option value="Residence">Residence</option>
                                <option value="Security">Security</option>
                            </select>
                            {errors.role && <p className="text-danger">{errors.role.message}</p>}
                        </div> */}

                        {/* Select Society */}
                        <div className="form-group mt-3">
                            <label>Select Society <span className="text-danger">*</span></label>
                            <select
                                className="form-control form-select"
                                {...register('society', { required: 'Society selection is required' })}
                                onChange={(e) => {
                                    if (e.target.value === "create_society") {
                                        setShowForm(true); // Show popup
                                    } else {
                                        setFormData((prev) => ({ ...prev, society: e.target.value }));
                                        setShowForm(false);
                                    }
                                }}
                            >
                                <option value="">Select Society</option>
                                {societies.map((society) => (
                                    <option key={society._id} value={society._id}>{society.societyName}</option>
                                ))}
                                <option value="create_society">Create Society</option>
                            </select>

                            {errors.society && <p className="text-danger">{errors.society.message}</p>}
                        </div>

                        {/* Password */}
                        <div className="form-group mt-3 position-relative">
                            <label>Password <span className="text-danger">*</span></label>
                            <input
                                className="form-control"
                                placeholder='Enter Password'
                                type={showPassword ? "text" : "password"}
                                {...register('password', { required: 'Password is required' })}
                            />
                            <span
                                className="password-icon translate-middle-y pr-3 cursor-pointer"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <HiMiniEyeSlash /> : <IoEyeSharp />}
                            </span>
                            {errors.password && <p className="text-danger">{errors.password.message}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div className="form-group mt-3 position-relative">
                            <label>Confirm Password <span className="text-danger">*</span></label>
                            <input
                                className="form-control"
                                placeholder='Confirm Password'
                                type={showConfirmPassword ? "text" : "password"}
                                {...register('confirmPassword', { required: 'Please confirm your password' })}
                            />
                            <span
                                className="password-icon translate-middle-y pr-3 cursor-pointer"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {showConfirmPassword ? <HiMiniEyeSlash /> : <IoEyeSharp />}
                            </span>
                            {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
                        </div>

                        {/* Terms and Conditions */}
                        <div className="form-check mt-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={termsAccepted}
                                onChange={toggleTermsAccepted}
                                id="termsCheck"
                            />
                            <label className="form-check-label" htmlFor="termsCheck">
                                I agree to the terms and <span className='text-danger'>Privicy Policies.</span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn w-100 my-3"
                        >Register</button>

                        <p className='text-center'>Already have an account? <Link to="/" className='text-danger text-decoration-none'>Login</Link></p>

                    </form>
                </div>
            </div>
            {/* Conditional Form Rendering */}
            <div className='position-absolute top-50 start-50 translate-middle z-index-'>
                {showForm && (
                    <div className="new-society-form bg-white shadow p-4">
                        <h3 className="h5 mb-4">Create New Society</h3>

                        <form onSubmit={handleNewSubmit(handleNewSocietySubmit)}>

                            {/* Society Name */}
                            <div className="mb-3">
                                <label className="form-label">Society Name<span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className="form-control "
                                    placeholder="Enter Society Name"
                                    {...registerNewSociety('societyName', { required: 'Name is required' })}
                                />
                                {newSocietyErrors.societyName && <p className="text-danger small">{newSocietyErrors.societyName.message}</p>}
                            </div>

                            {/* Society Address */}
                            <div className="mb-3">
                                <label className="form-label">Society Address<span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Address"
                                    {...registerNewSociety('address', { required: 'Address is required' })}
                                />
                                {newSocietyErrors.address && <p className="text-danger small">{newSocietyErrors.address.message}</p>}
                            </div>

                            {/* Country and State */}
                            <div className="row g-3 mb-3">
                                <div className="col-md">
                                    <label className="form-label">Country<span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='Enter Country'
                                        {...registerNewSociety('country', { required: 'Country is required' })}
                                    />
                                    {newSocietyErrors.country && <p className="text-danger small">{newSocietyErrors.country.message}</p>}
                                </div>

                                <div className="col-md">
                                    <label className="form-label">State<span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='Enter State'
                                        {...registerNewSociety('state', { required: 'State is required' })}
                                    />
                                    {newSocietyErrors.state && <p className="text-danger small">{newSocietyErrors.state.message}</p>}
                                </div>
                            </div>

                            {/* City and Zip Code */}
                            <div className="row g-3 mb-3">
                                <div className="col-md">
                                    <label className="form-label">City<span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='Enter City'
                                        {...registerNewSociety('city', { required: 'City is required' })}
                                    />
                                    {newSocietyErrors.city && <p className="text-danger small">{newSocietyErrors.city.message}</p>}
                                </div>

                                <div className="col-md">
                                    <label className="form-label">Zip Code<span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder='Enter Zip Code'
                                        {...registerNewSociety('Zip_code', { required: 'Zip Code is required' })}
                                    />
                                    {newSocietyErrors.Zip_code && <p className="text-danger small">{newSocietyErrors.Zip_code.message}</p>}
                                </div>
                            </div>

                            {/* Cancel and Save Buttons */}
                            <div className="d-flex justify-content-between">
                                <button
                                    type="button" // Change to type button
                                    className="btn cancle mt-2"
                                    onClick={handleCancel}>Cancel</button>

                                <button
                                    type="submit"
                                    className="btn save mt-2">Save</button>
                            </div>

                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}