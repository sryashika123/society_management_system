const mongoose = require('mongoose');

const security_protocol_Schema = new mongoose.Schema({
    title :{
        type: String,
        required: true
    },
    description :{
        type: String,
        required: true
    },
    date :{
        type: Date,
        required: true
    },
    time :{
        type: String,
        required: true
    }
});

const Security_protocol = mongoose.model('Security_protocol', security_protocol_Schema);
module.exports = Security_protocol;