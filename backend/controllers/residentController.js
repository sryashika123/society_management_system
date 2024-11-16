const Resident = require('../models/residentModel'); 
const fs = require("fs");
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();
const Society = require("../models/societyModel");
const Admin = require("../models/UserModel");


// Email sending setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false 
    }
});

// generate a random password
const generateRandomPassword = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for(let i = 0; i < 12; i++){  // Length of the password
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
};

// Function to send reset email
const sendMail = async (to, password) => {
    const mailOptions = {
        from: "<arjun.chauhan@swiftrut.com>",
        to: to,
        subject: 'Account Created - Your Temporary Password',
        text: `Your new password is: ${password}\n\nPlease use this password to log in to your account.`,
    };

    try{
        console.log("Attempting to send email to:", to);
        await transporter.sendMail(mailOptions);
        console.log("Password email sent successfully to:", to);
    }
    catch(error){
        console.error("Error sending email:", error);
        console.error("Stack trace:", error.stack);
        throw new Error("Error sending email");
    }
};

module.exports.createResident = async (req, res) => {
    try{
        const{
            role, ownerName, ownerPhone, ownerAddress, Full_name, Phone_number, Email, age, gender, wing, unit, Relation,
            Member_Counting, vehicle_Counting, vehicle_Type, vehicle_Name, vehicle_Number, residentStatus, adminId, societyId
        } = req.body;

        const admin = await Admin.findById(adminId);
		if (!admin) {
		  	return res.status(404).json({ msg: "Admin not found" });
		}

        const society = await Society.findById(societyId);
		if (!society) {
		  	return res.status(404).json({ msg: "Society not found" });
		}

        if(!role || !["owner", "tenant"].includes(role.toLowerCase())){
            return res.status(400).json({ msg: "Invalid role. Must be 'owner' or 'tenant'." });
        }

        let residentData = { 
            role: role.toLowerCase(), Full_name, Phone_number, Email, age, gender, wing, unit, Relation, 
            Member_Counting, vehicle_Counting, vehicle_Type, vehicle_Name, vehicle_Number, residentStatus, adminId, societyId
        };

        if(role.toLowerCase() === "tenant"){
            residentData.ownerName = ownerName;
            residentData.ownerPhone = ownerPhone;
            residentData.ownerAddress = ownerAddress;
        }
        if(req.files){
            const fileFields = [
                "Profile_Photo", "Aadhar_card_frontSide", "Aadhar_card_backSide", 
                "Address_Proof_VeraBill_or_LightBill", "Rent_Agreement"
            ];
            fileFields.forEach(field => {
                if (req.files[field]) {
                    residentData[field] = path.join(Resident.filePath, req.files[field][0].filename);
                }
            });
        }
        const newResident = new Resident(residentData);
        await newResident.save();
        console.log(`${role} created successfully:`, newResident);

        const randomPassword = generateRandomPassword();
        await sendMail(Email, randomPassword);
        res.json({ msg: `${role} created successfully`, resident: newResident });
    }
    catch(err){
        console.error("Error creating resident:", err.message);
        res.status(400).json({ err: err.message });
    }
};

module.exports.getAllResident = async (req, res) => {
    try{
        const ViewAllResident = await Resident.find();
        res.json(ViewAllResident);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

module.exports.deleteResident = async (req, res) => {
    try{
        const { id } = req.params;
        const residentData = await Resident.findById(id);
        if(!residentData) return res.status(404).json({ msg: "Resident data not found" });
        const fileFields = [
            "Profile_Photo",
            "Aadhar_card_frontSide",
            "Aadhar_card_backSide",
            "Address_Proof_VeraBill_or_LightBill",
            "Rent_Agreement"
        ];
        fileFields.forEach(field => {
            if(residentData[field]){
                const filePath = path.join(__dirname, "..", residentData[field]);
                if(fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
                else{
                    console.warn(`Image file does not exist at: ${filePath}`);
                }
            }
        });
        const deletedResident = await Resident.findByIdAndDelete(id);
        res.json({ msg: "Resident deleted successfully", deletedResident });
    }
    catch(err){
        console.error("Error deleting resident:", err.message);
        res.status(500).send("Server error");
    }
};

module.exports.updateResident = async (req, res) => {
    try{
        const id = req.params.id;
        const residentData = await Resident.findById(id);
        if(!residentData){
            res.status(404).json({ msg: "Resident data not found" });
        }
        const {
            role, ownerName, ownerPhone, ownerAddress, Full_name, Phone_number, Email, age, gender, wing, unit, Relation, 
            Member_Counting, vehicle_Counting, vehicle_Type, vehicle_Name, vehicle_Number, residentStatus } = req.body;

        let updateFields = {};
        const addFields = (fields) => {
            fields.forEach(field => {
                if (req.body[field]) updateFields[field] = req.body[field];
            });
        };

        addFields([ 'ownerName', 'ownerPhone', 'ownerAddress', 'Full_name', 'Phone_number', 'Email', 'age', 'gender', 'wing', 'unit',
            'Relation', 'Member_Counting', 'vehicle_Counting', 'vehicle_Type', 'vehicle_Name', 'vehicle_Number', 'residentStatus' ]);

        if(role && role.toLowerCase() === "tenant"){
            addFields(['ownerName', 'ownerPhone', 'ownerAddress']);
        }
        if(req.files){
            const fileFields = [
                "Profile_Photo", "Aadhar_card_frontSide", "Aadhar_card_backSide",
                "Address_Proof_VeraBill_or_LightBill", "Rent_Agreement"
            ];
            fileFields.forEach(field =>{
                if(req.files[field]){
                    const oldFilePath = path.join(__dirname, "..", residentData[field]);
                    if(residentData[field] && fs.existsSync(oldFilePath)){
                        try{
                            fs.unlinkSync(oldFilePath);
                        }
                        catch(error){
                            console.error(`Error deleting file ${oldFilePath}:`, error.message);
                        }
                    }
                    updateFields[field] = path.join(Resident.filePath, req.files[field][0].filename);
                }
            });
        }
        const updatedResident = await Resident.findByIdAndUpdate(id, updateFields, { new: true });
        if(!updatedResident){
            return res.status(404).json({ msg: "Resident not found" });
        }
        res.json({ msg: "Resident updated successfully", updatedResident });
    }
    catch(err){
        console.error("Error updating resident:", err.message);
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

module.exports.vacateflat = async (req, res) => {
    try{
        const owner = await Resident.findById(req.params.id);
        if(!owner) return res.status(404).json({ msg: "Owner not found" });
        owner.residentStatus = "vacant";
        await owner.save();
        
        const responseData = { 
            wing: owner.wing, 
            unit: owner.unit,
            residentStatus: owner.residentStatus
        }
        res.json({ msg: "Unit marked as vacant" , data : responseData });
    }
    catch(err){
        console.error("Error vacating flat:", err.message);
        res.status(500).json({ msg: "Server error", message: err.message });
    }
}