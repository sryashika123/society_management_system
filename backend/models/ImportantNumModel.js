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
    }
});

const ImportantNumber = mongoose.model("ImportantNumber", ImportantNumberSchema);
module.exports = ImportantNumber;