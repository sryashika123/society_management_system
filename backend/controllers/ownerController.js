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
    try {
        const ownerId = req.params.id;

        // Find the owner by ID
        const owner = await Owner.findById(ownerId);
        if (!owner) {
            return res.status(404).json({ msg: "Owner not found" });
        }

        // List of file fields to delete
        const fileFields = [
            "Profile_Photo",
            "Aadhar_card_frontSide",
            "Aadhar_card_backSide",
            "Address_Proof_VeraBill_or_LightBill",
            "Rent_Agreement"
        ];

        // Delete each file if it exists
        fileFields.forEach(field => {
            if (owner[field]) {
                const filePath = path.join(__dirname, "..", owner[field]);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath); // Delete file from the server
                } else {
                    console.warn(`Image file does not exist at: ${filePath}`);
                }
            }
        });

        // Delete the owner document from the database
        await Owner.findByIdAndDelete(ownerId);

        res.json({ msg: "Owner deleted successfully" });
    } 
    catch (err) {
        console.error("Error deleting owner:", err.message);
        res.status(500).send("Server error");
    }
};

module.exports.updateOwner = async (req, res) => {
    try {
        const { id } = req.params;
        const { Full_name, Phone_number, Email, age, gender, wing, unit, Relation, Member_Counting, vehicle_Counting, vehicle_Type, vehicle_Name, vehicle_Number } = req.body;

        // Find the existing owner
        const owner = await Owner.findById(id);
        if (!owner) {
            return res.status(404).json({ msg: "Owner not found" });
        }

        // Prepare the updated data
        let updateData = {
            Full_name,
            Phone_number,
            Email,
            age,
            gender,
            wing,
            unit,
            Relation,
            Member_Counting,
            vehicle_Counting,
            vehicle_Type,
            vehicle_Name,
            vehicle_Number,
        };

        // Handle file uploads and delete old files if new ones are uploaded
        if (req.files) {
            // Check each file and update its path in the database while deleting old files
            if (req.files.Profile_Photo) {
                if (owner.Profile_Photo && fs.existsSync(owner.Profile_Photo)) {
                    fs.unlinkSync(owner.Profile_Photo);
                }
                updateData.Profile_Photo = req.files.Profile_Photo[0].path;
            }

            if (req.files.Aadhar_card_frontSide) {
                if (owner.Aadhar_card_frontSide && fs.existsSync(owner.Aadhar_card_frontSide)) {
                    fs.unlinkSync(owner.Aadhar_card_frontSide);
                }
                updateData.Aadhar_card_frontSide = req.files.Aadhar_card_frontSide[0].path;
            }

            if (req.files.Aadhar_card_backSide) {
                if (owner.Aadhar_card_backSide && fs.existsSync(owner.Aadhar_card_backSide)) {
                    fs.unlinkSync(owner.Aadhar_card_backSide);
                }
                updateData.Aadhar_card_backSide = req.files.Aadhar_card_backSide[0].path;
            }

            if (req.files.Address_Proof_VeraBill_or_LightBill) {
                if (owner.Address_Proof_VeraBill_or_LightBill && fs.existsSync(owner.Address_Proof_VeraBill_or_LightBill)) {
                    fs.unlinkSync(owner.Address_Proof_VeraBill_or_LightBill);
                }
                updateData.Address_Proof_VeraBill_or_LightBill = req.files.Address_Proof_VeraBill_or_LightBill[0].path;
            }

            if (req.files.Rent_Agreement) {
                if (owner.Rent_Agreement && fs.existsSync(owner.Rent_Agreement)) {
                    fs.unlinkSync(owner.Rent_Agreement);
                }
                updateData.Rent_Agreement = req.files.Rent_Agreement[0].path;
            }
        }

        // Update the owner's data in the database
        const updatedOwner = await Owner.findByIdAndUpdate(id, updateData, { new: true });
        res.json({ msg: "Owner updated successfully", owner: updatedOwner });
    } catch (err) {
        console.error("Error updating owner:", err.message);
        res.status(500).send("Server error");
    }
};