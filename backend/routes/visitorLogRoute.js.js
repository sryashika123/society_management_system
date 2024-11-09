const express = require('express');

const router = express.Router();

const VisitorLogController = require('../controllers/visitorLogController');



router.post("/createVisitorLog", VisitorLogController.createVisitorLog);

router.get("/getVisitorLog", VisitorLogController.getVisitorLog);

router.delete("/deleteVisitorLog/:id", VisitorLogController.deleteVisitorLog);

router.put("/updateVisitorLog/:id", VisitorLogController.updateVisitorLog);


module.exports = router;