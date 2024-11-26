const Request = require("../models/requestModel");

module.exports.createRequest = async(req,res)=>{
    //  console.log(req.body);

     try {
        const { Requester_Name, Request_name, Request_Date, wing, unit, Priority, status } = req.body;
        if (!Requester_Name || !Request_name) {
            return res.status(400).json({ msg: "Requester_Name and Request_name are required." });
        }

        const newRequest = new Request({ Requester_Name, Request_name, Request_Date, wing, unit, Priority, status  });
        await newRequest.save();    
        res.json(newRequest);
    } 
    catch(err){ 
        console.error("Error creating Request:", err.message);
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

module.exports.getRequest = async(req, res)=> {
    try{
        const ViewAllRequest = await Request.find();
        res.json(ViewAllRequest);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

module.exports.deleteRequest = async(req, res)=> {
    try{
        const { id } = req.params;
        const deleteRequests = await Request.findByIdAndDelete(id);
        if(!deleteRequests){
            return res.status(404).json({ msg : "Request data Not Found" });
        }
        res.json({ msg: "Request deleted succsessfully", deleteRequests });
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("data not deleted")
    }   
}

module.exports.updateRequest = async(req, res) => {
    try {
        const { id } = req.params;
        const { Requester_Name, Request_name, Request_Date, wing, unit, Priority, status } = req.body;

        const allowedPriorities = ["Low", "Medium", "High"];
        const allowedStatuses = ["Pending", "Open", "Solve"];

        if (Priority && !allowedPriorities.includes(Priority)) {
            return res.status(400).json({ msg: `Invalid value for Priority. Allowed values are: ${allowedPriorities}` });
        }
        if (status && !allowedStatuses.includes(status)) {
            return res.status(400).json({ msg: `Invalid value for status. Allowed values are: ${allowedStatuses}` });
        }

        const updateRequest = await Request.findByIdAndUpdate( id, { Requester_Name, Request_name, Request_Date, wing, unit, Priority, status }, { new: true } );
        if (!updateRequest) {
            return res.status(404).json({ msg: "Request Not Found" });
        }
        res.json({ msg: "Request updated successfully", updateRequest });
    } 
    catch(err){
        console.error("Error updating Request:", err.message);
        res.status(500).send("Server error, data not updated");
    }
}