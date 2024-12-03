const mongoose = require("mongoose");

const VisitorTrackingSchema = new mongoose.Schema({  
    VisitorName: {
        type: String,
        required: true
    },
    Wing: {
        type: String,
        required: true
    },
    Unit: {
        type: Number,
        required: true
    },
    Date: {
        type: Date,
        required: true
    },
    Time: {
        type: String,
        required: true
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
{timestamps: true});

const VisitorTracking = mongoose.model("VisitorTracking", VisitorTrackingSchema);
module.exports = VisitorTracking;