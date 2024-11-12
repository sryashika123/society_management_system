const express = require('express');

const router = express.Router();

const securitygaurdModel = require("../models/SecuritygaurdModel");

const SecuritygaurdController = require("../controllers/SecuritygaurdController");


router.post("/createSecuritygaurd", securitygaurdModel.uploadedAvatar, SecuritygaurdController.createSecuritygaurd);

router.get("/getSecuritygaurd", SecuritygaurdController.getSecuritygaurd);

router.delete("/deleteSecuritygaurd/:id", SecuritygaurdController.deleteSecuritygaurd);

router.put("/updateSecuritygaurd/:id", securitygaurdModel.uploadedAvatar, SecuritygaurdController.updateSecuritygaurd);


module.exports = router;        