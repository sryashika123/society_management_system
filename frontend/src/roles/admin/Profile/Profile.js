import React, { useState } from "react";
import Navbar from "../../../component/Layout/Navbar";
import { useForm } from "react-hook-form";
import { MdEditSquare } from "react-icons/md";
import { Link } from "react-router-dom";
import Sidebar from "../../../component/Layout/Sidebar";
import defaultProfile from "../../../assets/profile.png"; // Default profile image

export default function Profile() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Simulating pre-filled profile data
  const initialData = {
    firstName: '',
    lastName: "",
    email: "",
    phone: "",
    select_society: "",
    country: "",
    state: "",
    city: "",
  };

  // State for dynamic image upload
  const [profileImage, setProfileImage] = useState(defaultProfile);

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Set uploaded image as profile image
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit function
  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    // Handle form submission to your server or API here
  };

  return (
    <div className="d-flex flex-column flex-md-row">
      <div className="flex-shrink-0">
        <Sidebar />
      </div>
      <div className="profile-dashboard-bg dashboard-bg" style={{ width: "1910px" }}>
        <Navbar />
        <div className="" style={{ marginLeft: "300px" , marginTop:"70px"}}>
          <div className="d-flex justify-content-center profile-bg">
            <div className="col-lg-6">
              <div className="d-flex align-items-center justify-content-between">
                <h3 className="mb-3 mt-5 profile-title">Profile</h3>
                <div className="d-flex justify-content-end mt-3">
                  <Link to="/home/EditProfile" className="text-decoration-none">
                    <button type="button" className="d-flex align-items-center btn btn-sm profile-btn mainColor2">
                      <MdEditSquare className="me-2" />
                      Edit Profile
                    </button>
                  </Link>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="form-group bg-light p-5 rounded d-flex justify-content-center">
                <div className="me-5 text-center">
                  {/* Profile Image */}
                  <label htmlFor="profileImage" style={{ cursor: "pointer" }}>
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="rounded-circle"
                      style={{ width: "150px", height: "150px" }}
                    />
                  </label>
                  <input
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                  <h5 className="mt-3">Arlene McCoy</h5>
                </div>

                <div className="ms-5">
                  {/* First Name & Last Name */}
                  <div className="d-flex">
                    <div className="mb-2 w-50 me-2">
                      <label htmlFor="fname" className="form-label mb-0">
                        First Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                        id="fname"
                        defaultValue={initialData.firstName}
                        {...register("firstName", { required: "First Name is required" })}
                      />
                      {errors.fname && <div className="invalid-feedback">{errors.firstName.message}</div>}
                    </div>

                    <div className="mb-2 w-50 ms-2">
                      <label htmlFor="lname" className="form-label mb-0">
                        Last Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                        id="lastName"
                        defaultValue={initialData.lastName}
                        {...register("lastName", { required: "Last Name is required" })}
                      />
                      {errors.lastName && <div className="invalid-feedback">{errors.lastName.message}</div>}
                    </div>
                  </div>

                  {/* Phone & Email */}
                  <div className="d-flex">
                    <div className="mb-2 w-50 me-2">
                      <label htmlFor="phone" className="form-label mb-0">
                        Phone Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                        id="phone"
                        defaultValue={initialData.phone}
                        {...register("phone", { required: "Phone Number is required" })}
                      />
                      {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
                    </div>

                    <div className="mb-2 w-50 ms-2">
                      <label htmlFor="email" className="form-label mb-0">
                        Email Address <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        id="email"
                        defaultValue={initialData.email}
                        {...register("email", { required: "Email is required" })}
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                    </div>
                  </div>

                  {/* Society & Country */}
                  <div className="d-flex">
                    <div className="mb-2 w-50 me-2">
                      <label htmlFor="society" className="form-label mb-0">
                        Society <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.select_society ? "is-invalid" : ""}`}
                        id="select_society"
                        defaultValue={initialData.select_society}
                        {...register("select_society", { required: "Society is required" })}
                      />
                      {errors.select_society && <div className="invalid-feedback">{errors.select_society.message}</div>}
                    </div>

                    <div className="mb-2 w-50 ms-2">
                      <label htmlFor="country" className="form-label mb-0">
                        Country <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.country ? "is-invalid" : ""}`}
                        id="country"
                        defaultValue={initialData.country}
                        {...register("country", { required: "Country is required" })}
                      />
                      {errors.country && <div className="invalid-feedback">{errors.country.message}</div>}
                    </div>
                  </div>

                  {/* State & City */}
                  <div className="d-flex">
                    <div className="mb-2 w-50 me-2">
                      <label htmlFor="state" className="form-label mb-0">
                        State <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.state ? "is-invalid" : ""}`}
                        id="state"
                        defaultValue={initialData.state}
                        {...register("state", { required: "State is required" })}
                      />
                      {errors.state && <div className="invalid-feedback">{errors.state.message}</div>}
                    </div>

                    <div className="mb-2 w-50 ms-2">
                      <label htmlFor="city" className="form-label mb-0">
                        City <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={`form-control ${errors.city ? "is-invalid" : ""}`}
                        id="city"
                        defaultValue={initialData.city}
                        {...register("city", { required: "City is required" })}
                      />
                      {errors.city && <div className="invalid-feedback">{errors.city.message}</div>}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
