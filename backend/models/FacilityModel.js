const mongoose = require('mongoose');

const FacilitySchema = new mongoose.Schema({
    Name :{
        type: String,
        required: true
    },
    description :{
        type: String,
        required: true
    },
    Service_date :{
        type: Date,
        required: true
    },
    Remind_before :{
        type: Number,
        required: true
    }
});

const Facility = mongoose.model('Facility', FacilitySchema);
module.exports = Facility;