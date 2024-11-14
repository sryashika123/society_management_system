const AlertModel = require("../models/AlertModel.js");

module.exports.createAlert = async (req, res) => {
    try{
        const { AlertType, description } = req.body;
        const newAlertModel = new AlertModel({
            AlertType,
            description
        });
        await newAlertModel.save();    
        res.json(newAlertModel);
    } 
    catch(err){ 
        console.error(err.message);
        res.status(500).json({ message: "Server error", err: err.message });
    }
};

module.exports.viewAlert = async (req, res) => {
    try{
        const ViewAlert = await AlertModel.find();
        res.json(ViewAlert);
    } 
    catch(err){ 
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

module.exports.deleteAlert = async(req,res)=>{
    try{
        const { id } = req.params;
        const deleteAlert = await AlertModel.findByIdAndDelete(id);
        if(!deleteAlert){
            return res.status(404).json({ msg : "Alert Data Not Found" });
        }
        res.json({ msg: "Alert deleted succsessfully", deleteAlert });
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("data not deleted")
    }
}
