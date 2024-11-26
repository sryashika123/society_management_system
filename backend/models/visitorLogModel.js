const mongoose = require('mongoose');

const VisitorLogSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Phone_number: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    Wing: {
        type: String,
        required: true
    },
    Unit_number: {
        type: Number,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    adminId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Admin', 
        required: true 
    },
    societyId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Society',
        required: true
    }
});

const VisitorLog = mongoose.model('Visitorlog', VisitorLogSchema);
module.exports = VisitorLog;