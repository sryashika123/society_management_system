const express = require('express');

const router = express.Router();

const VisitortrackingController = require('../controllers/VisitortrackingController');

const {authenticateUser , authorizeRoles} = require('../middleware/auth');





router.post("/createVisitortracking", 
    // authenticateUser , authorizeRoles('admin'),
     VisitortrackingController.createVisitortracking);

router.get("/getVisitortracking", 
    // authenticateUser , authorizeRoles('admin'),
     VisitortrackingController.getVisitortracking);

router.delete("/deleteVisitortracking/:id", 
    // authenticateUser , authorizeRoles('admin'),
     VisitortrackingController.deleteVisitortracking);    


module.exports = router;