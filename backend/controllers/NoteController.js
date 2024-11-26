const Note = require("../models/NoteModel");

module.exports.createNote = async(req,res) =>{
    try{
        const { title, description, date } = req.body;
        if(!title || !description || !date){
            return res.status(400).json({ msg: "fields are required." });
        }
        const newNote = new Note({ title, description, date });
        await newNote.save();    
        res.json(newNote);
    } 
    catch(err){ 
        console.error("Error creating Note:", err.message);
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

module.exports.ViewNote = async(req,res)=>{
    try{
        const ViewNote = await Note.find();
        res.json(ViewNote);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

module.exports.deleteNote = async(req,res)=> {
    try{
        const { id } = req.params;
        const deleteNote = await Note.findByIdAndDelete(id);
        if(!deleteNote){
            return res.status(404).json({ msg : "Note Data Not Found" });
        }
        res.json({ msg: "Note deleted succsessfully", deleteNote });
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("data not deleted")
    }
}

module.exports.updateNote = async(req,res)=> {
    try{
        const { id } = req.params;
        const { title, description, date } = req.body;
        
        const updateNote = await Note.findByIdAndUpdate(id, { title, description, date}, { new : true });
        if(!updateNote){
            res.status(404).json({ msg : "Note Data Not Found" });
        }
        res.json({ msg: "Note updated Succsessfully", updateNote});
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("data not updated");
    }
}