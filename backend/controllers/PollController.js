const Poll = require("../models/PollModel");

module.exports.createPoll = async(req,res) =>{
    try{
        const { Polls, Question, Option_1, Option_2 } = req.body;
        const newImportantNumber = new Poll({ 
            Polls, 
            Question, 
            Option_1, 
            Option_2 
        });
        await newImportantNumber.save();    
        res.json(newImportantNumber);
    } 
    catch(err){ 
        console.error("Error creating complaint:", err.message);
        res.status(500).json({ message: "Server error", err: err.message });
    }
}

module.exports.getPoll = async(req, res) =>{
    try{
        const ViewPoll = await Poll.find();
        res.json(ViewPoll);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

module.exports.deletePoll = async(req, res) =>{
    try{
        const { id } = req.params;
        const deletePoll = await Poll.findByIdAndDelete(id);
        if(!deletePoll){
            return res.status(404).json({ msg : "Poll Data Not Found" });
        }
        res.json({ msg: "Poll deleted succsessfully", deletePoll });
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("data not deleted")
    }
}