const Owner = require("../models/ownerModel");
const fs = require("fs");
const path = require("path");

module.exports.createOwner = async (req, res) => {
    try{
        const { Full_name, Phone_number, Email, age, gender, wing, unit, Relation, Member_Counting, vehicle_Counting, vehicle_Type, vehicle_Name, vehicle_Number } = req.body;
        let ownerData = {
            Full_name, Phone_number, Email, age, gender, wing, unit, Relation, Member_Counting, vehicle_Counting, vehicle_Type, vehicle_Name, vehicle_Number
        };

        if (req.files) {
            const fileFields = [
                "Profile_Photo",
                "Aadhar_card_frontSide",
                "Aadhar_card_backSide",
                "Address_Proof_VeraBill_or_LightBill",
                "Rent_Agreement"
            ];

            fileFields.forEach(field => {
                if (req.files[field]) {
                    ownerData[field] = path.join(Owner.filePath, req.files[field][0].filename);
                }
            });
        }

        const newOwner = new Owner(ownerData);
        await newOwner.save();

        res.json({ msg: "Owner created successfully", owner: newOwner });
    } 
    catch(err){
        console.error("Error creating owner:", err.message);
        res.status(500).send("Server error");
    }
};

module.exports.getAllOwner = async(req,res) => {
    try{
        const ViewAllOwner = await Owner.find();
        res.json(ViewAllOwner);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

module.exports.deleteOwner = async (req, res) => {
    try{
        const id = req.params.id;
        const owner = await Owner.findById(id);
        if(!owner){
            return res.status(404).json({ msg: "Owner not found" });
        }

        const fileFields = [
            "Profile_Photo",
            "Aadhar_card_frontSide",
            "Aadhar_card_backSide",
            "Address_Proof_VeraBill_or_LightBill",
            "Rent_Agreement"
        ];

        fileFields.forEach(field => {
            if(owner[field]) {
                const filePath = path.join(__dirname, "..", owner[field]);
                if(fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath); // Delete file from the server
                } 
                else {
                    console.warn(`Image file does not exist at: ${filePath}`);
                }
            }
        });

        const deletedOwner = await Owner.findByIdAndDelete(id);
        res.json({ msg: "Owner deleted successfully" , deletedOwner });
    } 
    catch(err){
        console.error("Error deleting owner:", err.message);
        res.status(500).send("Server error");
    }
};



// module.exports.updateOwner = async (req, res) => {
//     try {
//         const id = req.params.id;
//         let owner = await Owner.findById(id);
//         if (!owner) {
//             return res.status(404).json({ msg: "Owner not found" });
//         }

//         const { Full_name, Phone_number, Email, age, gender, wing, unit, Relation, Member_Counting, vehicle_Counting, vehicle_Type, vehicle_Name, vehicle_Number } = req.body;
//         let ownerData = { Full_name, Phone_number, Email, age, gender, wing, unit, Relation, Member_Counting, vehicle_Counting, vehicle_Type, vehicle_Name, vehicle_Number };
//         const fileFields = [
//             "Profile_Photo",
//             "Aadhar_card_frontSide",
//             "Aadhar_card_backSide",
//             "Address_Proof_VeraBill_or_LightBill",
//             "Rent_Agreement"
//         ];

//         if (req.files) {
//             fileFields.forEach(field => {
//                 if (req.files[field]) {
//                     if (ownerData[field]) {
//                         const oldFilePath = path.join(__dirname, "..", ownerData[field]);
//                         if (fs.existsSync(oldFilePath)) {
//                             fs.unlinkSync(oldFilePath);
//                         }
//                     }
//                     ownerData[field] = path.join(Owner.filePath, req.files[field][0].filename);
//                 }
//             });
//         }

//         const updatedOwner = await Owner.findByIdAndUpdate(id, ownerData, { new: true });
//         res.json({ msg: "Owner updated successfully",  updatedOwner });
   
//     } 
//     catch (err) {
//         console.error("Error updating owner:", err.message);
//         res.status(500).send("Server error");
//     }
// };


module.exports.updateOwner = async (req, res) => {
    try {
        const id = req.params.id;
        const ownerData = await Owner.findById(id);
        if (!ownerData) return res.status(404).json({ msg: "Owner not found" });

        const updateFields = { Full_name, Phone_number, Email, age, gender, wing, unit, Relation, Member_Counting, vehicle_Counting, vehicle_Type, vehicle_Name, vehicle_Number } = req.body;

        Object.entries(updateFields).forEach(([key, value]) => {
            if (value !== undefined) ownerData[key] = value;
        });

        const fileFields = [
            "Profile_Photo",
            "Aadhar_card_frontSide",
            "Aadhar_card_backSide",
            "Address_Proof_VeraBill_or_LightBill",
            "Rent_Agreement"
        ];

        if (req.files) {
            fileFields.forEach(field => {
                if (req.files[field]) {
                    const oldFilePath = path.join(__dirname, "..", ownerData[field]);
                    if (ownerData[field] && fs.existsSync(oldFilePath)) {
                        fs.unlinkSync(oldFilePath);
                    }
                    ownerData[field] = path.join(Owner.filePath, req.files[field][0].filename);
                }
            });
        }

        const updatedOwner = await Owner.findByIdAndUpdate(id, ownerData, { new: true });
        res.json({ msg: "Owner updated successfully",  updatedOwner });

    } catch (err) {
        console.error("Error updating owner:", err.message);
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};