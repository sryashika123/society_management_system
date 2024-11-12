const Securitygaurd = require('../models/SecuritygaurdModel');
const fs = require('fs');
const path = require('path');

module.exports.createSecuritygaurd = async (req, res) => {
    try{
        // Trim any extra spaces from keys
        if(req.body['Shift_time ']){
            req.body.Shift_time = req.body['Shift_time '].trim();
            delete req.body['Shift_time ']; // Remove the incorrect key
        }

        const { Full_name, Phone_number, gender, shift, Shift_Date, Shift_time } = req.body;

        if(!Shift_time){
            return res.status(400).json({ message: 'Shift_time is required' });
        }

        if(!req.files || !req.files.Security_Gard_Image || !req.files.Aadhar_card){
            return res.status(400).json({ message: 'Please upload both Security Guard image and Aadhar card' });
        }
        const basePath = '/uploads/Security-Gaurd-image/';
        const newSecurityGaurd = new Securitygaurd({
            Full_name,
            Phone_number,
            gender,
            shift,
            Shift_Date,
            Shift_time,
            Security_Gard_Image: basePath + req.files.Security_Gard_Image[0].filename,
            Aadhar_card: basePath + req.files.Aadhar_card[0].filename
        });

        await newSecurityGaurd.save();
        res.status(201).json({
            message: 'Security Guard created successfully',
            data: newSecurityGaurd
        });
    } 
    catch(err){
        console.error("Error creating SecurityGaurd:", err.message);
        res.status(500).json({ message: 'Server error while creating SecurityGaurd', err: err.message });
    }
};

module.exports.getSecuritygaurd = async (req,res) =>{
    try{
        const ViewAllSecuritygaurd = await Securitygaurd.find();
        res.json(ViewAllSecuritygaurd);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

module.exports.deleteSecuritygaurd = async (req, res) => {
    try {
        const { id } = req.params; 
        const securityGaurd = await Securitygaurd.findById(id);
        if(!securityGaurd){
            return res.status(404).json({ message: 'Security Guard not found' });
        }

        const avatarPath = path.join(__dirname, '..', 'uploads', 'Security-Gaurd-image');
        if(securityGaurd.Security_Gard_Image){
            const imagePath = path.join(__dirname, '..', securityGaurd.Security_Gard_Image); 
            console.log("Deleting image at:", imagePath); 
            if(fs.existsSync(imagePath)){
                fs.unlinkSync(imagePath); 
                console.log("Image deleted successfully");
            } 
            else{
                console.error("Image not found:", imagePath); 
            }
        }

        if(securityGaurd.Aadhar_card){
            const aadharPath = path.join(__dirname, '..', securityGaurd.Aadhar_card); 
            console.log("Deleting Aadhar card at:", aadharPath); 
            if(fs.existsSync(aadharPath)){
                fs.unlinkSync(aadharPath);
                console.log("Aadhar card deleted successfully");
            } 
            else{
                console.error("Aadhar card not found:", aadharPath); 
            }
        }

        const deletedSecurityGaurd = await Securitygaurd.findByIdAndDelete(id);
        res.status(200).json({ message: 'Security Guard deleted successfully', deletedSecurityGaurd });
    } 
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error while deleting security guard' });
    }
};

module.exports.updateSecuritygaurd = async (req, res) => {
    try{
        const { id } = req.params; 
        const securityGaurd = await Securitygaurd.findById(id);
        if(!securityGaurd){
            return res.status(404).json({ message: 'Security Guard not found' });
        }

        const { Full_name, Phone_number, gender, shift, Shift_Date, Shift_time } = req.body;
        const updatedData = {
            Full_name: Full_name || securityGaurd.Full_name,
            Phone_number: Phone_number || securityGaurd.Phone_number,
            gender: gender || securityGaurd.gender,
            shift: shift || securityGaurd.shift,
            Shift_Date: Shift_Date || securityGaurd.Shift_Date,
            Shift_time: Shift_time || securityGaurd.Shift_time,
        };
        if(req.files){
            if(req.files.Security_Gard_Image){
                const oldImagePath = path.join(__dirname, '..', 'uploads', 'Security-Gaurd-image', path.basename(securityGaurd.Security_Gard_Image));
                if(fs.existsSync(oldImagePath)){
                    fs.unlinkSync(oldImagePath);
                }
                else{
                    console.log('Old image not found:', oldImagePath);
                }
                updatedData.Security_Gard_Image = '/uploads/Security-Gaurd-image/' + req.files.Security_Gard_Image[0].filename;
            }

            if(req.files.Aadhar_card){
                const oldAadharPath = path.join(__dirname, '..', 'uploads', 'Security-Gaurd-image', path.basename(securityGaurd.Aadhar_card));
                if(fs.existsSync(oldAadharPath)){
                    fs.unlinkSync(oldAadharPath);
                } 
                else{
                    console.log('Old Aadhar card not found:', oldAadharPath);
                }
                updatedData.Aadhar_card = '/uploads/Security-Gaurd-image/' + req.files.Aadhar_card[0].filename;
            }
        }

        const updatedSecurityGaurd = await Securitygaurd.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(200).json({
            message: 'Security Guard updated successfully',
            data: updatedSecurityGaurd,
        });

    } 
    catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error while updating security guard' });
    }
};