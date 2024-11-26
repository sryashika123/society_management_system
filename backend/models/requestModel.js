const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
        Requester_Name :{
            type: String,
            required: true
        },
        Request_name :{
            type: String,
            required: true
        },
        Request_Date :{
            type: Date,
            required: true
        },
        wing: {
            type: String,
            required: true
        },
        unit: {
            type: Number,
            required: true
        },
        Priority: {
            type: String,
            enum: ["Low", "Medium" ,"High"],
            default: "medium"
        },
        status:{
            type: String,
            enum: ["Pending", "Open", "Solve"],
            default: "Pending"
        },
    },
    { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;