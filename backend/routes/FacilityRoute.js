const express = require("express");

const router = express.Router();

const FacilityController = require("../controllers/FacilityController");



router.post("/createFacility", FacilityController.createFacility);

router.get("/getFacility", FacilityController.getFacility);

router.delete("/deleteFacility/:id", FacilityController.deleteFacility);

router.put("/updateFacility/:id", FacilityController.updateFacility);



module.exports = router;