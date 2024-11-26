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
},
{timestamps: true});

const VisitorTracking = mongoose.model("VisitorTracking", VisitorTrackingSchema);
module.exports = VisitorTracking;