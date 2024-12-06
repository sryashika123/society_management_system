const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendMail } = require('../utils/nodemailer');
const otpService = require('../utils/otpService');
const Society = require("../models/societyModel");
const Resident = require("../models/residentModel");
const Security = require("../models/SecuritygaurdModel");


// Register
module.exports.register = async (req, res) => {
	try{
		const { firstName, lastName, Email, phone, country, state, city, select_society, password, confirmPassword , role} = req.body;
		let user = await User.findOne({ Email });
		

		const society = await Society.findById(select_society);
		if (!society) {
		  	return res.status(404).json({ msg: "Society not found" });
		}
		if(user) {
			return res.status(400).json({ msg: 'User already exists' });
		}
		if(password !== confirmPassword) {
			return res.status(400).json({ msg: 'Passwords do not match' });
		}
		
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		user = new User({ firstName, lastName, Email, phone, country, state, city, select_society, password: hashedPassword, confirmPassword: hashedPassword , role});
		await user.save();
		res.status(201).json({ msg: 'User registered successfully' });
	} 
	catch (err){
		console.error(err.message);
		res.status(500).send('Server error');
	}
};                                

module.exports.login = async (req, res,err) => {
	// console.log(req.body);
	// console.log("JWT_SECRET:", process.env.JWT_SECRET);

	try{
		const { Email, password } = req.body;
		let user = await User.findOne({ Email });
	
		if (!user) {
		  user = await Resident.findOne({ Email });
		}
		if (!user) {
		  user = await Security.findOne({ Email });
		}
		console.log(user.password);
	
		if (!user) {
		  return res.status(400).json({ message: "Email not exists" });
		}

	  if(!user.password) {
		return res.status(400).json({ message: "password not exists" });
	  }

	  const isMatch = await bcrypt.compare(password, user.password);
	  if (password == user.password) {
		return res.status(400).json({ message: "password match" });
	  }

		const payload = {
			user: { user: user },
		};
		
		const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
		res.cookie('token', token, { httpOnly: true, secure: true });
		res.status(200).json({ msg: 'Logged in successfully', token });

	} 
	catch(err){
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

// module.exports.login = async (req, res) => {
// 	try {
// 	  const { Email, password } = req.body;
// 	  let user = await user.findOne({ Email });
  
// 	  if (!user) {
// 		user = await Resident.findOne({ Email });
// 	  }
  
// 	  if (!user) {
// 		user = await securetygaurdmodel.findOne({ Email });
// 	  }
  
// 	  if (!user) {
// 		return res.status(400).json({ message: "Email not exists" });
// 	  }
// 	  const isMatch = await bcrypt.compare(password, user.password);
// 	  if (!isMatch) {
// 		return res.status(400).json({ message: "password do not match" });
// 	  }
// 	  const { password: _, ...userWithoutPassword } = user.toObject();
// 	  const token = jwt.sign(
// 		{ user: userWithoutPassword },
// 		process.env.JWT_SECRET,
// 		{ expiresIn: "30d" }
// 	  );
  
// 	  res.cookie("authToken", token, {
// 		httpOnly: true,
// 		secure: true,
// 		sameSite: "None",
// 		maxAge: 30 * 24 * 60 * 60 * 1000,
// 	  });
  
// 	  res.status(200).json({ message: "Login successful", token });
// 	} catch (error) {
// 	  console.error("Error during login:", error.message);
// 	  res.status(500).json({ message: "Server error" });
// 	}
//   };

module.exports.logout = (req, res) => {
	try {
		res.clearCookie('token', { httpOnly: true, secure: true });
		// const logout = localStorage.removeItem('token'); 
		res.status(200).json({ msg: 'Logged out successfully' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

module.exports.forgotpassword = async (req, res) => {
	const Email = req.body.Email;
	try{
		const user = await User.findOne({ Email });
		if(!user) {
			return res.status(400).json({ msg: 'User not found' });
		}

		const otp = otpService.generateOTP();
		user.otp = otp;
		user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
		await user.save();

		await sendMail(user.Email, otp);
		res.status(200).json({ message: 'OTP sent to your Email.' });
	} 
	catch(err){
		console.error('Error during password reset:', err);
		res.status(500).json({ message: 'Error processing request.', error: err.message });
	}
};

module.exports.resendotp = async (req, res) => {
	const Email = req.body.Email;
	
	try{
	 	const user = await User.findOne({ Email });
		if(!user) {
				return res.status(400).json({ msg: 'User not found' });
		}
  
		const otp = otpService.generateOTP();
		user.otp = otp;
		user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
		await user.save();

		const mal = await (sendMail)(user.Email,otp)
		res.status(200).json({ message: 'Resended OTP sent to your Email.' });
	} 
	catch(err){
		console.error('Error during password reset:', err);
		res.status(500).json({ message: 'Error processing request.', error: err.message });
	}
};

module.exports.verifyotp = async (req, res) => {
	const { Email, otp } = req.body;
	try{
		const user = await User.findOne({ Email });
		if(!user || user.otp !== otp || user.otpExpires < Date.now()) {
			return res.status(400).json({ msg: 'Invalid or expired OTP.' });
		}
		user.otp = undefined;
		user.otpExpires = undefined;
		await user.save();
		res.status(200).json({ message: 'OTP verified successfully. You can now reset your password.' });
	}
	catch(err){
		res.status(500).json({ message: 'Error verifying OTP.', error: err.message });
	}
};

module.exports.resetpassword = async (req, res) => {
	const { password , confirmPassword} = req.body;
    if(!password) {
        return res.status(400).json({ success: false, message: "Password is required" });
    }
	// if(password !== confirmPassword) {
	// 	return res.status(400).json({ msg: 'Passwords do not match' });
	// }
    try{
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the new password
        await User.updateOne({ password: hashedPassword });
        res.json({ success: true,message: "Password updated successfully" });
    } 
	catch(error){
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports.getProtectedData = (req, res) => {
	try {
		res.status(200).json({ msg: 'Access granted to protected data', user: req.user });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
}