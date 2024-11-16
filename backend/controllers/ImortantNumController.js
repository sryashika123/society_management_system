const ImportantNumber = require("../models/ImportantNumModel"); 
const Society = require("../models/societyModel");
const Admin = require("../models/UserModel");

module.exports.createImportantNum = async (req, res) => {
    try{
        const { Full_name, Phone_number, Work, adminId, societyId } = req.body;

        const admin = await Admin.findById(adminId);
		if (!admin) {
		  	return res.status(404).json({ msg: "Admin not found" });
		}

        const society = await Society.findById(societyId);
		if (!society) {
		  	return res.status(404).json({ msg: "Society not found" });
		}
        
        const newImportantNumber = new ImportantNumber({
            Full_name,
            Phone_number,
            Work,
            adminId,
            societyId
        });
        await newImportantNumber.save();    
        res.json(newImportantNumber);
    } 
    catch(err){ 
        console.error(err.message);
        res.status(500).json({ err: err.message });
    }
};

module.exports.getImportantNum = async(req,res) =>{
    try{
        const ViewImportantNumber = await ImportantNumber.find();
        res.json(ViewImportantNumber);
    }
    catch(err){
        console.error(err.message);
        res.status(500).json({ err: err.message });
    }
}

module.exports.deleteImportantNum = async(req,res)=>{
    try{
        const { id } = req.params;
        const deleteImportantNum = await ImportantNumber.findByIdAndDelete(id);
        if(!deleteImportantNum){
            return res.status(404).json({ msg : "ImportantNumber Data Not Found" });
        }
        res.json({ msg: "ImportantNumber deleted succsessfully", deleteImportantNum });
    }
    catch(err){
        console.log(err.message);
        res.status(500).json("data not deleted", err.message);
    }
}

module.exports.updateImportantNum = async(req,res)=>{
    try{
        const { id } = req.params;
        const { Full_name, Phone_number, Work } = req.body;
        
        const updateImportantNum = await ImportantNumber.findByIdAndUpdate(id, { Full_name, Phone_number, Work}, { new : true });
        if(!updateImportantNum){
            res.status(404).json({ msg : "ImportantNumber Data Not Found" });
        }
        res.json({ msg: "ImportantNumber updated Succsessfully", updateImportantNum});
    }
    catch(err){
        console.log(err.message);
        res.status(500).json("data not updated" , err.message);
    }
}