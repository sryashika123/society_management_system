import React, { useState } from 'react';
import axios from 'axios';

export default function CreateSocietyForm({ setAllSocites, allsocites }) {
    const [societyDetails, setSocietyDetails] = useState({
        societyName: '',
        societyAddress: '',
        country: '',
        state: '',
        city: '',
        zipCode: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSocietyDetails({ ...societyDetails, [name]: value });
    };

    const handleCancel = () => {
        setSocietyDetails({
            societyName: '',
            societyAddress: '',
            country: '',
            state: '',
            city: '',
            zipCode: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                address: societyDetails.societyAddress,
                Zip_code: societyDetails.zipCode,
                societyName: societyDetails.societyName,
                country: societyDetails.country,
                state: societyDetails.state,
                city: societyDetails.city,
            };
            const response = await axios.post('http://localhost:8000/api/users/v2/createSociety', payload);
            setAllSocites([...allsocites, response.data.society]);
            handleCancel();
            const modal = window.bootstrap.Modal.getInstance(document.getElementById('createSocietyModal'));
            modal.hide();
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Failed to create society';
            alert(`Error: ${errorMessage}`);
            console.error('Error:', errorMessage);
        }
    };

    return (
        <div>
            <div className="modal fade" id="createSocietyModal" tabIndex="-1" aria-labelledby="createSocietyModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="createSocietyModalLabel">Create New Society</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="societyName" className="form-label">Society Name<span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="societyName"
                                        name="societyName"
                                        value={societyDetails.societyName}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="societyAddress" className="form-label">Society Address<span className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="societyAddress"
                                        name="societyAddress"
                                        value={societyDetails.societyAddress}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="row">
                                    <div className="col-12 col-md-6 mb-3">
                                        <label htmlFor="country" className="form-label">Country<span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="country"
                                            name="country"
                                            value={societyDetails.country}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <label htmlFor="state" className="form-label">State<span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="state"
                                            name="state"
                                            value={societyDetails.state}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-md-6 mb-3">
                                        <label htmlFor="city" className="form-label">City<span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="city"
                                            name="city"
                                            value={societyDetails.city}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-12 col-md-6 mb-3">
                                        <label htmlFor="zipCode" className="form-label">Zip Code<span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="zipCode"
                                            name="zipCode"
                                            value={societyDetails.zipCode}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button type="button" className="btn btn-outline-secondary" onClick={handleCancel} data-bs-dismiss="modal">Cancel</button>
                                    <button
                                        type="submit"
                                        className="btn"
                                        onClick={handleSubmit}
                                        style={{
                                            background: 'linear-gradient(90deg, #FE512E 0%, #F09619 100%)',
                                            color: 'black'
                                        }}
                                        data-bs-dismiss="modal"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}