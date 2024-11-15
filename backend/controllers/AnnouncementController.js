const Announcement = require("../models/AnnouncementModel");

module.exports.createAnnouncement = async(req,res) =>{
    try{
        const { title, description, date, time } = req.body;
        if (!title || !description || !date || !time) {
            return res.status(400).json({ msg: "All fields are required." });
        }
        const newAnnouncement = new Announcement({ title, description, date, time });
        await newAnnouncement.save();    
        res.json(newAnnouncement);
    } 
    catch(err){ 
        console.error(err.message);
        res.status(500).json({ err: err.message });
    }
}

module.exports.getAnnouncement = async (req, res) => {
    try{
        const ViewAnnouncement = await Announcement.find();
        res.json(ViewAnnouncement);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

module.exports.deleteAnnouncement = async(req, res) => {
    try{
        const { id } = req.params;
        const deleteAnnouncement = await Announcement.findByIdAndDelete(id);
        if(!deleteAnnouncement){
            return res.status(404).json({ msg : "Announcement Data Not Found" });
        }
        res.json({ msg: "Announcement deleted succsessfully", deleteAnnouncement });
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({ err: err.message });
    }
}

module.exports.updateAnnouncement = async(req, res) => {
    try{
        const { id } = req.params;
        const { title, description, date, time } = req.body;
        
        const updateAnnouncement = await Announcement.findByIdAndUpdate(id, { title, description, date, time}, { new : true });
        if(!updateAnnouncement){
            res.status(404).json({ msg : "Announcement Data Not Found" });
        }
        res.json({ msg: "Announcement updated Succsessfully", updateAnnouncement});
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({ err: err.message });
    }
}