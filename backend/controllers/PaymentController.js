const Payment = require('../models/PaymentModel');

exports.createPayment = async (req, res) => {
    try{
        const{ Card_Name, Card_number, Expiry_date, CVV, status, Member } = req.body;
        if(!Card_Name || !Expiry_date || !Member || !Expiry_date){
            return res.status(400).json({ message: "Card name is required." });
        }
        if(!Card_number || Card_number.toString().length > 16){
            return res.status(400).json({ message: "Card number is required and must be 16 digits or fewer." });
        }
        if(!CVV || CVV.toString().length !== 3){
            return res.status(400).json({ message: "CVV is required and must be exactly 3 digits." });
        }
        if(Member && typeof Member !== 'number'){
            return res.status(400).json({ message: "Member must be a number." });
        }
        const payment = new Payment({
            Card_Name,
            Card_number,
            Expiry_date,
            CVV,
            status,
            Member
        });
        await payment.save();
        res.status(201).json(payment);
    }
    catch(error){
        res.status(400).json({ message: error.message });
    }
};

module.exports.getPayment = async (req, res) => {
    try{
        const payment = await Payment.find();
        res.json(payment);
    }
    catch(error){
        console.error(err.message);
        res.status(500).json({ message: error.message });
    }
};

module.exports.deletePayment = async (req, res) =>{
    try{
        const { id } = req.params;
        const deletePayment = await Payment.findByIdAndDelete(id);
        if(!deletePayment){
            return res.status(404).json({ msg : "Payment Data Not Found" });
        }
        res.json({ msg: "Payment deleted succsessfully", deletePayment });
    }
    catch(err){
        console.log(err.message);
        res.status(500).send("data not deleted")
    }
}