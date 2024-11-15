const express = require("express");

const router = express.Router();

const ProfileController = require("../controllers/profileController");

const User = require("../models/UserModel");


router.get("/viewProfile", ProfileController.viewProfile);

router.put("/updateProfile/:id", User.uploadedAvatar, ProfileController.updateProfile);

router.delete("/deleteProfile/:id", ProfileController.deleteProfile);


module.exports = router;  