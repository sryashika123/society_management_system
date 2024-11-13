const express = require('express');

const router = express.Router();

const MaintenanceController = require("../controllers/MaintenanceController");



router.post("/createMaintenance", MaintenanceController.createMaintenance);

router.get("/getAllMaintenances", MaintenanceController.getAllMaintenances);

router.put("/updateMaintenance/:id", MaintenanceController.updateMaintenance);

router.delete("/deleteMaintenance/:id", MaintenanceController.deleteMaintenance);

router.get("/getMaintenance/:id", MaintenanceController.getMaintenance);

module.exports = router;