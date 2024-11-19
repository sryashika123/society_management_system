import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'; // Added axios import
import profile from '../../images/profile.png';
import { MdEditSquare } from "react-icons/md";
import './Profile.css';

export default function Profile() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [profileImage, setProfileImage] = useState(profile); // Use imported profile as the default image
    const [userId, setUserId] = useState(" "); // Declare userId state

    useEffect(() => {
        // Get the userId from localStorage (or from any other source like props)
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            setUserId(storedUserId); // Set the userId from localStorage
        } else {
            console.error("User ID not found in localStorage!");
        }
    }, []);

    useEffect(() => {
        // Fetch user profile data only if userId is available
        if (userId) {
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/v5/viewProfile/${userId}`)
                .then((res) => {
                    const data = res.data;
                    Object.keys(data).forEach((key) => setValue(key, data[key])); // Set form fields with fetched data
                    if (data.ProfileImage) setProfileImage(data.ProfileImage); // Set profile image if available
                })
                .catch((err) => console.error("Error fetching profile:", err));
        }
    }, [userId, setValue]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setProfileImage(reader.result); // Update profile image preview
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data) => {
        const formData = new FormData();

        // Append all form data fields
        Object.keys(data).forEach((key) => {
            if (key === "ProfileImage" && data.ProfileImage && data.ProfileImage.length > 0) {
                formData.append(key, data.ProfileImage[0]);
            } else {
                formData.append(key, data[key]);
            }
        });

        try {
            const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/users/v5/updateProfile/${userId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Profile updated successfully:", res.data.msg);
        } catch (err) {
            if (err.response) {
                console.error("Error updating profile:", err.response.data.msg || "Unknown error");
            } else {
                console.error("Error updating profile:", err.message || "Network or server error");
            }
        }
    };

    return (
        <div className="profile-dashboard-bg dashboard-bg main-content" style={{ marginLeft: "270px", width: "1640px" }}>
            <div className="d-flex justify-content-center profile-bg">
                <div className="col-lg-6">
                    <div className="d-flex align-items-center justify-content-between">
                        <h3 className="mb-3 mt-5 profile-title">Edit Profile</h3>
                    </div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="form-group bg-light p-5 rounded d-flex justify-content-between mt-3"
                        style={{ border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)" }}
                    >
                        {/* Profile Image Section */}
                        <div className="profile-image-section text-center">
                            <div className="profile-image-wrapper">
                                <img
                                    src={profileImage}
                                    alt="Profile"
                                    className="rounded-circle profile-image"
                                />
                                <MdEditSquare
                                    className="edit-icon"
                                    onClick={() => document.getElementById('profileImageUpload').click()} // Open file input on click
                                />
                                <input
                                    id="profileImageUpload"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={(e) => {
                                        setValue("ProfileImage", e.target.files); // Update the form data
                                        handleImageChange(e); // Update the preview
                                    }}
                                />

                            </div>
                            <p className="mt-3" style={{ fontSize: "18px", fontWeight: "500" }}>Arlene McCoy</p>
                        </div>

                        {/* Form Fields Section */}
                        <div className="w-100 ms-5">
                            <div className="d-flex flex-wrap">
                                <div className="mb-2 w-50 pe-2">
                                    <label>First Name <span className="text-danger">*</span></label>
                                    <input
                                        placeholder="Enter First Name"
                                        type="text"
                                        className={`form-control ${errors.fname ? 'is-invalid' : ''}`}
                                        {...register('fname', { required: 'First Name is required' })}
                                    />
                                    {errors.fname && <div className="invalid-feedback">{errors.fname.message}</div>}
                                </div>

                                <div className="mb-2 w-50 ps-2">
                                    <label>Last Name <span className="text-danger">*</span></label>
                                    <input
                                        placeholder="Enter Last Name"
                                        type="text"
                                        className={`form-control ${errors.lname ? 'is-invalid' : ''}`}
                                        {...register('lname', { required: 'Last Name is required' })}
                                    />
                                    {errors.lname && <div className="invalid-feedback">{errors.lname.message}</div>}
                                </div>

                                <div className="mb-2 w-50 pe-2">
                                    <label>Phone Number <span className="text-danger">*</span></label>
                                    <input
                                        placeholder="+91"
                                        type="text"
                                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                        {...register('phone', { required: 'Phone Number is required' })}
                                    />
                                    {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
                                </div>

                                <div className="mb-2 w-50 ps-2">
                                    <label>Email Address <span className="text-danger">*</span></label>
                                    <input
                                        placeholder="abc@example.com"
                                        type="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        {...register('email', { required: 'Email is required' })}
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                                </div>

                                <div className="mb-2 w-50 pe-2">
                                    <label>Select Society <span className="text-danger">*</span></label>
                                    <input
                                        placeholder="Select Society"
                                        type="text"
                                        className={`form-control ${errors.society ? 'is-invalid' : ''}`}
                                        {...register('society', { required: 'Society is required' })}
                                    />
                                    {errors.society && <div className="invalid-feedback">{errors.society.message}</div>}
                                </div>

                                <div className="mb-2 w-50 ps-2">
                                    <label>Country <span className="text-danger">*</span></label>
                                    <input
                                        placeholder="Select Country"
                                        type="text"
                                        className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                                        {...register('country', { required: 'Country is required' })}
                                    />
                                    {errors.country && <div className="invalid-feedback">{errors.country.message}</div>}
                                </div>

                                <div className="mb-2 w-50 pe-2">
                                    <label>State <span className="text-danger">*</span></label>
                                    <input
                                        placeholder="Select State"
                                        type="text"
                                        className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                                        {...register('state', { required: 'State is required' })}
                                    />
                                    {errors.state && <div className="invalid-feedback">{errors.state.message}</div>}
                                </div>

                                <div className="mb-2 w-50 ps-2">
                                    <label>City <span className="text-danger">*</span></label>
                                    <input
                                        placeholder="Select City"
                                        type="text"
                                        className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                                        {...register('city', { required: 'City is required' })}
                                    />
                                    {errors.city && <div className="invalid-feedback">{errors.city.message}</div>}
                                </div>
                            </div>

                            <div className="d-flex justify-content-end mt-3">
                                <button type="submit" className="btn btn-sm profile-btn">Update Profile</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
