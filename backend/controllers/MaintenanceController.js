const Maintenance = require('../models/MaintenanceModel');
const Society = require("../models/societyModel");
const Admin = require("../models/UserModel");

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