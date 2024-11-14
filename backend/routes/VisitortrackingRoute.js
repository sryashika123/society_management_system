const express = require('express');

const router = express.Router();

const VisitortrackingController = require('../controllers/VisitortrackingController');

router.post("/createVisitortracking", VisitortrackingController.createVisitortracking);

router.get("/getVisitortracking", VisitortrackingController.getVisitortracking);

router.delete("/deleteVisitortracking/:id", VisitortrackingController.deleteVisitortracking);    


module.exports = router;