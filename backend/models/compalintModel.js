const mongoose = require("mongoose");

const CompalintSchema = new mongoose.Schema({
    Complaint_name :{
        type: String,
        required: true
    },
    Complainer_name :{
        type: String,
        required: true
    },
    description :{
        type: String,
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
    adminId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Admin', 
        // required: true 
    },
    societyId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Society',
        // required: true
    }
    },
    { timestamps: true }
);

const Complaint = mongoose.model("Complaint", CompalintSchema);
module.exports = Complaint;