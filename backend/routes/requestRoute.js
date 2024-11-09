const express = require('express');

const router = express.Router();

const requestController = require("../controllers/requestController");


router.post("/createRequest", requestController.createRequest);

router.get("/getRequest", requestController.getRequest);

router.delete("/deleteRequest/:id", requestController.deleteRequest);

router.put("/updateRequest/:id", requestController.updateRequest);


module.exports = router;