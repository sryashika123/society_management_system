const ImportantNumber = require("../models/ImportantNumModel"); 

module.exports.createImportantNum = async (req, res) => {
    try{
        const { Full_name, Phone_number, Work } = req.body;
        const newImportantNumber = new ImportantNumber({
            Full_name,
            Phone_number,
            Work
        });
        await newImportantNumber.save();    
        res.json(newImportantNumber);
    } 
    catch(err){ 
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

module.exports.getImportantNum = async(req,res) =>{
    try{
        const ViewImportantNumber = await ImportantNumber.find();
        res.json(ViewImportantNumber);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
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
        res.status(500).send("data not deleted")
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
        res.status(500).send("data not updated");
    }
}