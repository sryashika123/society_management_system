import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ResidentForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    age: '',
    gender: '',
    wing: '',
    unit: '',
    relation: '',
    occupation: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    aadharFront: null,
    aadharBack: null,
    addressProof: null,
    rentAgreement: null,
    memberCount: 0,
    vehicleCount: 0,
    members: [],
    vehicles: [],
    ownerName: '', // Tenant-specific field
    ownerPhoneNumber: '', // Tenant-specific field
    ownerAddress: '' // Tenant-specific field
  });

  const [formType, setFormType] = useState('owner');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleMemberChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMembers = [...formData.members];
    updatedMembers[index] = { ...updatedMembers[index], [name]: value };
    setFormData({ ...formData, members: updatedMembers });
  };

  const handleVehicleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVehicles = [...formData.vehicles];
    updatedVehicles[index] = { ...updatedVehicles[index], [name]: value };
    setFormData({ ...formData, vehicles: updatedVehicles });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Reset form data
    setFormData({
      fullName: '',
      phoneNumber: '',
      emailAddress: '',
      age: '',
      gender: '',
      wing: '',
      unit: '',
      relation: '',
      occupation: '',
      emergencyContactName: '',
      emergencyContactNumber: '',
      aadharFront: null,
      aadharBack: null,
      addressProof: null,
      rentAgreement: null,
      memberCount: 0,
      vehicleCount: 0,
      members: [],
      vehicles: [],
      ownerName: '',
      ownerPhoneNumber: '',
      ownerAddress: ''
    });

    navigate('/home/residentmanagement');
  };

  return (
    <div className="container p-4" style={{ maxWidth: '1155px', marginLeft: '350px', marginTop: '100px' }}>
      <div className="mb-4">
        <button
          className={`btn ${formType === 'owner' ? 'mainColor2' : 'btn'} me-2`}
          onClick={() => setFormType('owner')}
        >
          Owner
        </button>
        <button
          className={`btn ${formType === 'tenant' ? 'mainColor2' : 'btn'}`}
          onClick={() => setFormType('tenant')}
        >
          Tenant
        </button>
      </div>

      <form onSubmit={handleSubmit}>



         {/* Tenant-Specific Owner Fields */}
         {formType === 'tenant' && (
          <div className="row mb-3">
            <div className="col-md-4">
              <label>Owner Name*</label>
              <input type="text" name="ownerName" className="form-control" value={formData.ownerName} onChange={handleInputChange} required />
            </div>
            <div className="col-md-4">
              <label>Owner Phone Number*</label>
              <input type="text" name="ownerPhoneNumber" className="form-control" value={formData.ownerPhoneNumber} onChange={handleInputChange} required />
            </div>
            <div className="col-md-4">
            <label>Owner Email Address</label>
            <input type="email" name="emailAddress" className="form-control" value={formData.emailAddress} onChange={handleInputChange} />
          </div>
          </div>
        )}
        {/* Basic Info Fields */}
        <div className="row mb-3">
          <div className="col-md-4">
            <label>Full Name*</label>
            <input type="text" name="fullName" className="form-control" value={formData.fullName} onChange={handleInputChange} required />
          </div>
          <div className="col-md-4">
            <label>Phone Number*</label>
            <input type="text" name="phoneNumber" className="form-control" value={formData.phoneNumber} onChange={handleInputChange} required />
          </div>
          <div className="col-md-4">
            <label>Email Address</label>
            <input type="email" name="emailAddress" className="form-control" value={formData.emailAddress} onChange={handleInputChange} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-2">
            <label>Age*</label>
            <input type="number" name="age" className="form-control" value={formData.age} onChange={handleInputChange} required />
          </div>
          <div className="col-md-2">
            <label>Gender*</label>
            <select name="gender" className="form-control" value={formData.gender} onChange={handleInputChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-md-4">
            <label>Wing*</label>
            <input type="text" name="wing" className="form-control" value={formData.wing} onChange={handleInputChange} required />
          </div>
          <div className="col-md-4">
            <label>Unit*</label>
            <input type="text" name="unit" className="form-control" value={formData.unit} onChange={handleInputChange} required />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label>Relation*</label>
            <input type="text" name="relation" className="form-control" value={formData.relation} onChange={handleInputChange} required />
          </div>
        </div>

       

        {/* Document Upload Section */}
        <div className="row mb-3">
          <div className="col-md-3">
            <label>Upload Aadhar Card (Front Side)</label>
            <input type="file" name="aadharFront" className="form-control" onChange={handleFileChange} accept=".png, .jpg, .jpeg, .gif" />
          </div>
          <div className="col-md-3">
            <label>Upload Aadhar Card (Back Side)</label>
            <input type="file" name="aadharBack" className="form-control" onChange={handleFileChange} accept=".png, .jpg, .jpeg, .gif" />
          </div>
          <div className="col-md-3">
            <label>Address Proof (Vera Bill / Light Bill)</label>
            <input type="file" name="addressProof" className="form-control" onChange={handleFileChange} accept=".png, .jpg, .jpeg, .gif" />
          </div>
          <div className="col-md-3">
            <label>Rent Agreement</label>
            <input type="file" name="rentAgreement" className="form-control" onChange={handleFileChange} accept=".png, .jpg, .jpeg, .gif" />
          </div>
        </div>

        {/* Member and Vehicle Count */}
        {/* Member and Vehicle Count */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Select Member Count</label>
            <select
              name="memberCount"
              className="form-control"
              value={formData.memberCount}
              onChange={(e) => {
                const count = Number(e.target.value);
                setFormData({ 
                  ...formData, 
                  memberCount: count, 
                  members: Array.from({ length: count }, (_, i) => formData.members[i] || {}) 
                });
              }}
            >
              {[...Array(7).keys()].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label>Select Vehicle Count</label>
            <select
              name="vehicleCount"
              className="form-control"
              value={formData.vehicleCount}
              onChange={(e) => {
                const count = Number(e.target.value);
                setFormData({ 
                  ...formData, 
                  vehicleCount: count, 
                  vehicles: Array.from({ length: count }, (_, i) => formData.vehicles[i] || {}) 
                });
              }}
            >
              {[...Array(7).keys()].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Members Input Fields */}
        {formData.members.map((member, index) => (
          <div key={index} className="row mb-3">
            <div className="col-md-4">
              <label>Full Name*</label>
              <input type="text" name="fullName" className="form-control" value={member.fullName || ''} onChange={(e) => handleMemberChange(index, e)} required />
            </div>
            <div className="col-md-4">
              <label>Phone No*</label>
              <input type="text" name="phoneNumber" className="form-control" value={member.phoneNumber || ''} onChange={(e) => handleMemberChange(index, e)} required />
            </div>
            <div className="col-md-4">
              <label>Relation*</label>
              <input type="text" name="relation" className="form-control" value={member.relation || ''} onChange={(e) => handleMemberChange(index, e)} required />
            </div>
          </div>
        ))}

        {/* Vehicles Input Fields */}
        {formData.vehicles.map((vehicle, index) => (
          <div key={index} className="row mb-3">
            <div className="col-md-4">
              <label>Vehicle Type</label>
              <select name="vehicleType" className="form-control" value={vehicle.vehicleType || ''} onChange={(e) => handleVehicleChange(index, e)}>
                <option value="">Select Vehicle Type</option>
                <option value="Two Wheeler">Two Wheeler</option>
                <option value="Four Wheeler">Four Wheeler</option>
              </select>
            </div>
            <div className="col-md-4">
              <label>Vehicle Name</label>
              <input type="text" name="vehicleName" className="form-control" value={vehicle.vehicleName || ''} onChange={(e) => handleVehicleChange(index, e)} />
            </div>
            <div className="col-md-4">
              <label>Vehicle Number</label>
              <input type="text" name="vehicleNumber" className="form-control" value={vehicle.vehicleNumber || ''} onChange={(e) => handleVehicleChange(index, e)} />
            </div>
          </div>
        ))}

        <button type="submit" className="btn mainColor2">Create</button>
      </form>
    </div>
  );
}