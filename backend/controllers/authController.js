const User = require('../models/authModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendMail } = require('../utils/nodemailer');
const otpService = require('../utils/otpService');

// Register
module.exports.register = async (req, res) => {
	try{
		const { firstName, lastName, email, phone, country, state, city, select_society, password, confirmPassword } = req.body;
		let user = await User.findOne({ email });
		
		if(user) {
			return res.status(400).json({ msg: 'User already exists' });
		}
		if(password !== confirmPassword) {
			return res.status(400).json({ msg: 'Passwords do not match' });
		}
		
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		user = new User({ firstName, lastName, email, phone, country, state, city, select_society, password: hashedPassword, confirmPassword: hashedPassword });
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
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		
		if(!user){
			return res.status(400).json({ msg: 'User not found' });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if(!isMatch){
			return res.status(400).json({ msg: 'Invalid Password' });
		}

		const payload = {
			user: { user: user },
			user: { id: user.id,email: user.email, password: user.password },
		};
		
		const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
		// res.cookie('token', token, { httpOnly: true, secure: true });
		res.status(200).json({ msg: 'Logged in successfully', token });
	} 
	catch(err){
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

module.exports.forgotpassword = async (req, res) => {
	const email = req.body.email;
	try{
		const user = await User.findOne({ email });
		if(!user) {
			return res.status(400).json({ msg: 'User not found' });
		}

		const otp = otpService.generateOTP();
		user.otp = otp;
		user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
		await user.save();

		await sendMail(user.email, otp);
		res.status(200).json({ message: 'OTP sent to your email.' });
	} 
	catch(err){
		console.error('Error during password reset:', err);
		res.status(500).json({ message: 'Error processing request.', error: err.message });
	}
};

module.exports.resendotp = async (req, res) => {
	const email = req.body.email;
	
	try{
	 	const user = await User.findOne({ email });
		if(!user) {
				return res.status(400).json({ msg: 'User not found' });
		}
  
		const otp = otpService.generateOTP();
		user.otp = otp;
		user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
		await user.save();

		const mal = await (sendMail)(user.email,otp)
		res.status(200).json({ message: 'Resended OTP sent to your email.' });
	} 
	catch(err){
		console.error('Error during password reset:', err);
		res.status(500).json({ message: 'Error processing request.', error: err.message });
	}
};


module.exports.verifyotp = async (req, res) => {
	const { email, otp } = req.body;
	try{
		const user = await User.findOne({ email });
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