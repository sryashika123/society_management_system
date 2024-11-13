const express = require('express');

const router = express.Router();

const residentController = require("../controllers/residentController");

const Resident = require("../models/residentModel");

router.post("/createResident", Resident.uploadFiles, residentController.createResident);

router.get("/getAllResident", residentController.getAllResident);

router.delete("/deleteResident/:id", residentController.deleteResident);

router.put("/updateResident/:id", Resident.uploadFiles, residentController.updateResident)



module.exports = router;