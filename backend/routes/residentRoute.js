const express = require('express');

const router = express.Router();

const residentController = require("../controllers/residentController");

const Resident = require("../models/residentModel");

router.post("/createResident", Resident.uploadFiles, residentController.createResident);

router.get("/getAllResident", residentController.getAllResident);

router.get("/getResident/:id", residentController.getResident);

router.delete("/deleteResident/:id", residentController.deleteResident);

router.put("/updateResident/:id", Resident.uploadFiles, residentController.updateResident)

router.post("/vacateflat/:id", residentController.vacateflat);


module.exports = router;