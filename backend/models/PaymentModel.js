const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
        Member :{
            type: Number,
        },
        Card_Name :{
            type: String,
            required: true
        },
        Card_number :{
            type: Number,
            required: true
        },
        Expiry_date :{
            type: Date,
            required: true
        },
        CVV :{
            type: Number,
            required: true
        },
        status : {
            type: String,
            enum : ['Pending', 'Complete'],
            default: 'Pending',
            required: true
        },
    },
    { timestamps: true }
);

const Payment = mongoose.model('payment', PaymentSchema);    
module.exports = Payment;