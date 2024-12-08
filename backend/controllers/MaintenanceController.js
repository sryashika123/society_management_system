const Maintenance = require('../models/MaintenanceModel');
const Society = require("../models/societyModel");
const Admin = require("../models/UserModel");
const bcrypt = require('bcrypt');

exports.createMaintenance = async (req, res) => {
    try{
        const { Maintenance_amount, Penalty_Amount, Due_date, lastDate, penaltyAppliedAfterDays, status, Payment_Method,  adminId, societyId } = req.body;
        const admin = await Admin.findById(adminId);
		if (!admin) {
		  	return res.status(404).json({ msg: "Admin not found" });
		}

        const society = await Society.findById(societyId);
		if (!society) {
		  	return res.status(404).json({ msg: "Society not found" });
		}

        const maintenance = new Maintenance({ Maintenance_amount, Penalty_Amount, Due_date, lastDate, penaltyAppliedAfterDays, status, Payment_Method,  adminId, societyId });
        await maintenance.save();
        res.status(201).json(maintenance);
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
};


exports.getAllMaintenances = async (req, res) => {
    try{
        const maintenances = await Maintenance.find();
        res.status(200).json(maintenances);
    }
    catch(error){
        console.error(err.message);
        res.status(500).json({ error: error.message });
    }
};

exports.password_match = async (req, res) => {
    const { password } = req.body; // Extract the plain-text password from the request body
    try {
        if (!password) {
            return res.status(400).json({ error: "Password is required" });
        }

        // Fetch the first admin record from the database
        const admin = await Admin.findOne().select('password');
        if (!admin) {
            return res.status(404).json({ msg: "Admin not found" });
        }

        // Compare the plain-text password with the hashed password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Password does not match" });
        }

        res.status(200).json({ msg: "Password matches" , admin , isMatch });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateMaintenance = async (req, res) => {
    try{
        const maintenance = await Maintenance.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!maintenance) {
            return res.status(404).json({ message: "Maintenance record not found" });
        }
        res.json({ msg: "Maintenance updated successfully", maintenance });
    }
    catch(error){
        res.status(400).json({ error: error.message });
    }
};

exports.deleteMaintenance = async (req, res) => {
    try {
        const maintenance = await Maintenance.findByIdAndDelete(req.params.id);
        if (!maintenance) {
            return res.status(404).json({ message: "Maintenance record not found" });
        }
        res.status(200).json({ message: "Maintenance record deleted successfully" , maintenance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getMaintenance = async (req, res) => {
    try {
        const maintenance = await Maintenance.findById(req.params.id);
        if (!maintenance) {
            return res.status(404).json({ message: "Maintenance record not found" });
        }
        res.status(200).json(maintenance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};