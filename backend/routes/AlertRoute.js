const express = require("express");

const router = express.Router();

const AlertController = require("../controllers/AlertController.js");

router.post("/CreateAlert", AlertController.createAlert);

router.get("/ViewAlert", AlertController.viewAlert);    

router.delete("/DeleteAlert/:id", AlertController.deleteAlert);

module.exports = router;    