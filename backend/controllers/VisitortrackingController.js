const VisitortrackingModel = require("../models/VisitortrackingModel.js");
const Society = require("../models/societyModel");
const Admin = require("../models/UserModel");

module.exports.createVisitortracking = async (req, res) => {
    try{
        const {VisitorName, Wing, Unit, Date, Time, adminId, societyId} = req.body;

        const admin = await Admin.findById(adminId);
		if (!admin) {
		  	return res.status(404).json({ msg: "Admin not found" });
		}

        const society = await Society.findById(societyId);
		if (!society) {
		  	return res.status(404).json({ msg: "Society not found" });
		}
        
        const newVisitortracking = new VisitortrackingModel({
            VisitorName,
            Wing,
            Unit,
            Date,
            Time,
            adminId,
            societyId
        });
        await newVisitortracking.save();    
        res.json(newVisitortracking);
    } 
    catch(err){ 
        console.error(err.message);
        res.status(500).json({ message: "Server error", err: err.message });
    }
};

module.exports.getVisitortracking = async (req, res) => {
    try{
        const viewVisitortracking = await VisitortrackingModel.find();
        res.json(viewVisitortracking);
    } 
    catch(err){ 
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

module.exports.deleteVisitortracking = async(req,res)=>{
    try{
        const { id } = req.params;
        const deleteVisitor = await VisitortrackingModel.findByIdAndDelete(id);
        if(!deleteVisitor){
            return res.status(404).json({ msg : "Visitortracking Data Not Found" });
        }
        res.json({ msg: "Visitortracking deleted succsessfully", deleteVisitor });
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("data not deleted")
    }
}