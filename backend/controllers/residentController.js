const path = require("path");
const fs = require("fs");
const Resident = require("../models/residentModel");

module.exports.createResident = async (req, res) => {
    try {
        // Destructure fields from request body
        const {
            role, // 'owner' or 'tenant'
            ownerName, ownerPhone, ownerAddress,
            Full_name, Phone_number, Email, age, gender,
            wing, unit, Relation, Member_Counting,
            vehicle_Counting, vehicle_Type, vehicle_Name, vehicle_Number,
        } = req.body;

        // Validate the role
        if (!role || !["owner", "tenant"].includes(role.toLowerCase())) {
            return res.status(400).json({ msg: "Invalid role. Must be 'owner' or 'tenant'." });
        }

        // Prepare the common resident data object
        let residentData = {
            role: role.toLowerCase(),
            Full_name, Phone_number, Email, age, gender,
            wing, unit, Relation, Member_Counting,
            vehicle_Counting, vehicle_Type, vehicle_Name, vehicle_Number
        };

        // Include owner-specific fields if the role is 'tenant'
        if (role.toLowerCase() === "tenant") {
            residentData.ownerName = ownerName;
            residentData.ownerPhone = ownerPhone;
            residentData.ownerAddress = ownerAddress;
        }

        // Handle file uploads if they exist
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
                    residentData[field] = path.join(Resident.filePath, req.files[field][0].filename);
                }
            });
        }

        // Create a new resident document in the database
        const newResident = new Resident(residentData);
        await newResident.save();

        res.json({ msg: `${role} created successfully`, resident: newResident });
    } catch (err) {
        console.error("Error creating resident:", err.message);
        res.status(500).send("Server error");
    }
};

module.exports.getAllResident = async (req, res) => {
    try {
        const ViewAllResident = await Resident.find();
        res.json(ViewAllResident);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};

module.exports.deleteResident = async (req, res) => {
    try {
        const { id } = req.params;
        const residentData = await Resident.findById(id);
        if (!residentData) return res.status(404).json({ msg: "Resident data not found" });
        const fileFields = [
            "Profile_Photo",
            "Aadhar_card_frontSide",
            "Aadhar_card_backSide",
            "Address_Proof_VeraBill_or_LightBill",
            "Rent_Agreement"
        ];
        fileFields.forEach(field => {
            if (residentData[field]) {
                const filePath = path.join(__dirname, "..", residentData[field]);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath); // Delete file from the server
                }
                else {
                    console.warn(`Image file does not exist at: ${filePath}`);
                }
            }
        });
        const deletedResident = await Resident.findByIdAndDelete(id);
        res.json({ msg: "Resident deleted successfully", deletedResident });
    }
    catch (err) {
        console.error("Error deleting resident:", err.message);
        res.status(500).send("Server error");
    }
};

module.exports.updateResident = async (req, res) => {
    try {
        const id = req.params.id;
        const residentData = await Resident.findById(id);
        if (!residentData) return res.status(404).json({ msg: "Resident data not found" });
        const {
            role,ownerName, ownerPhone, ownerAddress,
            Full_name, Phone_number, Email, age, gender,
            wing, unit, Relation, Member_Counting,
            vehicle_Counting, vehicle_Type, vehicle_Name, vehicle_Number,
            residentStatus
        } = req.body;
        let updateFields = {};
        const addFields = (fields) => {
            fields.forEach(field => {
                if (req.body[field]) updateFields[field] = req.body[field];
            });
        };
        addFields([
            'Full_name', 'Phone_number', 'Email', 'age', 'gender', 'wing', 'unit', 'Relation',
            'Member_Counting', 'vehicle_Counting', 'vehicle_Type', 'vehicle_Name', 'vehicle_Number', 'residentStatus'
        ]);
        if (role && role.toLowerCase() === "tenant") {
            addFields(['ownerName', 'ownerPhone', 'ownerAddress']);
        }
        if (req.files) {
            const fileFields = [
                "Profile_Photo", "Aadhar_card_frontSide", "Aadhar_card_backSide",
                "Address_Proof_VeraBill_or_LightBill", "Rent_Agreement"
            ];
            fileFields.forEach(field => {
                if (req.files[field]) {
                    const oldFilePath = path.join(__dirname, "..", residentData[field]);
                    if (residentData[field] && fs.existsSync(oldFilePath)) {
                        fs.unlinkSync(oldFilePath); // Delete the old file
                    }
                    updateFields[field] = path.join(Resident.filePath, req.files[field][0].filename);
                }
            });
        }
        const updatedResident = await Resident.findByIdAndUpdate(id, updateFields, { new: true });
        if (!updatedResident) {
            return res.status(404).json({ msg: "Resident not found" });
        }
        res.json({ msg: "Resident updated successfully", updatedResident });
    } catch (err) {
        console.error("Error updating resident:", err.message);
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};

