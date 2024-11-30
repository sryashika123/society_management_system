const express = require('express');

const router = express.Router();

const VisitorLogController = require('../controllers/visitorLogController');

const {authenticateUser , authorizeRoles} = require('../middleware/auth');




router.post("/createVisitorLog", 
    // authenticateUser , authorizeRoles('admin'),
     VisitorLogController.createVisitorLog);

router.get("/getVisitorLog", 
    // authenticateUser , authorizeRoles('admin'),
     VisitorLogController.getVisitorLog);

router.delete("/deleteVisitorLog/:id", 
    // authenticateUser , authorizeRoles('admin'),
     VisitorLogController.deleteVisitorLog);

router.put("/updateVisitorLog/:id", 
    // authenticateUser , authorizeRoles('admin'),
     VisitorLogController.updateVisitorLog);


module.exports = router;