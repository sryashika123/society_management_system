const express = require('express');

const router = express.Router();

const ownerController = require("../controllers/ownerController");

const Owner = require("../models/ownerModel");

router.post("/createOwner", Owner.uploadFiles, ownerController.createOwner);

router.get("/getAllOwner", ownerController.getAllOwner);

router.delete("/deleteOwner/:id", ownerController.deleteOwner);

router.put("/updateOwner/:id", Owner.uploadFiles, ownerController.updateOwner)


module.exports = router;