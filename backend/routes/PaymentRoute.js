const express = require("express");

const router = express.Router();

const PaymentController = require("../controllers/PaymentController");




router.post("/createPayment", PaymentController.createPayment);

router.get("/getPayment", PaymentController.getPayment);

router.delete("/deletePayment/:id", PaymentController.deletePayment);


module.exports = router;