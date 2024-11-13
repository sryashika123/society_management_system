const express = require("express");

const router = express.Router();

const OtherIncomController = require("../controllers/OtherIncomeController");



router.post("/createOtherIncome", OtherIncomController.createOtherIncome);

router.get("/getOtherIncome", OtherIncomController.getOtherIncome);

router.delete("/deleteOtherIncome/:id", OtherIncomController.deleteOtherIncome);

router.put("/updateOtherIncome/:id", OtherIncomController.updateOtherIncome);


module.exports = router;