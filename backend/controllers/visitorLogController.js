const VisitorLog = require("../models/visitorLogModel");
const Society = require("../models/societyModel");
const Admin = require("../models/UserModel");

module.exports.createVisitorLog = async(req,res)=>{
    try{
        const { Name, Phone_number, date, Wing, Unit_number, time} = req.body;

        // const admin = await Admin.findById(adminId);
		// if (!admin) {
		//   	return res.status(404).json({ msg: "Admin not found" });
		// }

        // const society = await Society.findById(societyId);
		// if (!society) {
		//   	return res.status(404).json({ msg: "Society not found" });
		// }

        if(!Name || !Phone_number || !date || !Wing || !Unit_number || !time) {
            return res.status(400).json({ msg: "fields are required." });
        }

        const newVisitorLog = new VisitorLog({ Name, Phone_number, date: new Date(date), Wing, Unit_number, time });
        await newVisitorLog.save();
        res.status(201).json({ msg: "VisitorLog created successfully", protocol: newVisitorLog });
    } 
    catch(err){
        console.error("Error creating VisitorLog:", err.message);
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

module.exports.getVisitorLog = async(req,res)=>{
    try {
        const ViewAllVisitorLog = await VisitorLog.find();
        res.json(ViewAllVisitorLog);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

module.exports.deleteVisitorLog = async(req,res)=>{
    try{
        const { id } = req.params;
        const deleteVistorLog = await VisitorLog.findByIdAndDelete(id);
        if(!deleteVistorLog){
            return res.status(404).json({ msg : "VisitorLog Data Not Found" });
        }
        res.json({ msg: "VisitorLog deleted succsessfully", deleteVistorLog });
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("data not deleted");
    }
}

module.exports.updateVisitorLog = async(req,res)=>{
    try {
        const { id } = req.params;
        const { Name, Phone_number, date, Wing, Unit_number, time } = req.body;

        const updateVisitorlog = await VisitorLog.findByIdAndUpdate(id, { Name, Phone_number, date: new Date(date), Wing, Unit_number, time }, { new: true });
        if (!updateVisitorlog) {
            return res.status(404).json({ msg: "Visitorlog data not found" });
        }
        res.json({ msg: "Visitorlog updated successfully", updateVisitorlog });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}