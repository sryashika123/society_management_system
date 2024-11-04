const express = require("express");

const router = express.Router();

const usercontroller =require("../controllers/authController");


router.post("/register", usercontroller.register);

router.post("/login", usercontroller.login);

router.post("/forgot-password", usercontroller.forgotpassword);

router.post("/verify-otp", usercontroller.verifyotp);

router.post("/reset-password", usercontroller.resetpassword);


module.exports = router;