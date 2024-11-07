const express = require("express");

const router = express.Router();

const ProfileController = require("../controllers/profileController");

const Auth = require("../models/authModel");


router.get("/viewProfile", ProfileController.viewProfile);

router.put("/updateProfile/:id", Auth.uploadedAvatar, ProfileController.updateProfile);

router.delete("/deleteProfile/:id", ProfileController.deleteProfile);


module.exports = router;  