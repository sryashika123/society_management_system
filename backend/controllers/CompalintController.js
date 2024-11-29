const Complaint = require("../models/compalintModel");
const Society = require("../models/societyModel");
const Admin = require("../models/UserModel");

module.exports.createComplaints = async (req, res) => {
    // console.log(req.body);
    try {
        const { Complaint_name, Complainer_name, description, wing, unit, Priority, status } = req.body;

        // const admin = await Admin.findById(adminId);
		// if (!admin) {
		//   	return res.status(404).json({ msg: "Admin not found" });
		// }

        // const society = await Society.findById(societyId);
		// if (!society) {
		//   	return res.status(404).json({ msg: "Society not found" });
		// }

        if (!Complaint_name || !Complainer_name) {
            return res.status(400).json({ msg: "Complaint_name and Complainer_name are required." });
        }

        const newComplaint = new Complaint({ Complaint_name, Complainer_name, description, wing, unit, Priority, status });
        await newComplaint.save();    
        res.json(newComplaint);
    } 
    catch (err) { 
        console.error("Error creating complaint:", err.message);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports.viewComplaints = async(req,res)=>{
    try{
        const viewComplaints = await Complaint.find();
        res.json(viewComplaints);
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({ err: err.message });
    }
}

module.exports.deleteComplaints = async(req,res)=>{
    try{
        const { id } = req.params;
        const deleteComplaints = await Complaint.findByIdAndDelete(id);
        if(!deleteComplaints){
            return res.status(404).json({ msg : "Complaint Data Not Found" });
        }
        res.json({ msg: "Complaint deleted succsessfully", deleteComplaints });
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({ err: err.message });
    }   
}

module.exports.updateComplaints = async (req, res) => {
    try {
        const { id } = req.params;
        const { Complaint_name, Complainer_name, description, wing, unit, Priority, status } = req.body;

        const allowedPriorities = ["Low", "Medium", "High"];
        const allowedStatuses = ["Pending", "Open", "Solve"];

        if (Priority && !allowedPriorities.includes(Priority)) {
            return res.status(400).json({ msg: `Invalid value for Priority. Allowed values are: ${allowedPriorities}` });
        }
        if (status && !allowedStatuses.includes(status)) {
            return res.status(400).json({ msg: `Invalid value for status. Allowed values are: ${allowedStatuses}` });
        }

        const updateComplaints = await Complaint.findByIdAndUpdate( id, { Complaint_name, Complainer_name, description, wing, unit, Priority, status }, { new: true } );
        if (!updateComplaints) {
            return res.status(404).json({ msg: "Complaint Not Found" });
        }
        res.json({ msg: "Complaint updated successfully", updateComplaints });
    } 
    catch(err){
        console.error("Error updating complaint:", err.message);
        res.status(500).send("Server error, data not updated");
    }
};
