const Maintenance = require('../models/MaintenanceModel');

exports.createMaintenance = async (req, res) => {
    try{
        const maintenance = new Maintenance(req.body);
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