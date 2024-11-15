const mongoose = require("mongoose");

const ImportantNumberSchema = new mongoose.Schema({
    Full_name: {
        type: String,
        required: true
    },
    Phone_number: {
        type: Number,
        required: true
    },
    Work :{
        type: String,
        required: true
    },
    UserId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    Society_Id :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'society',
        required: true
    }
});

const ImportantNumber = mongoose.model("ImportantNumber", ImportantNumberSchema);
module.exports = ImportantNumber;