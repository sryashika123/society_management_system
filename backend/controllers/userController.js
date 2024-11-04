const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendMail } = require('../utils/nodemailer');
const otpService = require('../utils/otpService');

// Register
module.exports.register = async (req, res) => {
	try {
		const { firstName, lastName, email, phone, country, state, city, select_society, password, confirmPassword } = req.body;

		// Check if the user already exists
		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ msg: 'User already exists' });
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ msg: 'Passwords do not match' });
		}
		// Hash the password before saving
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		// Create a new user
		user = new User({
			firstName,
			lastName,
			email,
			phone,
			country,
			state,
			city,
			select_society,
			password: hashedPassword,
			confirmPassword: hashedPassword
		});
		await user.save();
		res.status(201).json({ msg: 'User registered successfully' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};


// Login

// {
//     "firstName": "John",
//     "lastName": "Doe",
//     "email": "john.doe@example.com",
//     "phone": "1234567890",
//     "country": "USA",
//     "state": "NY",
//     "city": "New York",
//     "select_society": "Example Society",
//     "password": "yourpassword123",
//     "confirmPassword": "yourpassword123"
// }




// Login                                          
module.exports.login = async (req, res,err) => {
	// console.log(req.body);
	// console.log("JWT_SECRET:", process.env.JWT_SECRET);

	try {
		const { email, password } = req.body;

		// Check if user email exists
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ msg: 'User not found' });
		}

		// Check if password matches
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ msg: 'Invalid Password' });
		}

		// Create and sign a JWT token


		const payload = {
			user: {
				id: user.id,
				// Example: user: { id: user.id, name: user.name, email: user.email, role: user.role }
			},
		};
		// console.log(payload);
		
		const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

		// Set cookie with token
		res.cookie('token', token, { httpOnly: true, secure: true });

		// Send response
		res.status(200).json({ msg: 'Logged in successfully', token });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
};

module.exports.forgotpassword = async (req, res) => {
	const email = req.body.email;
	try {
		// Find user by email
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ msg: 'User not found' });
		}

		// Create OTP
		const otp = otpService.generateOTP();
		user.otp = otp;
		user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
		await user.save();

		await sendMail(user.email, otp);
		res.status(200).json({ message: 'OTP sent to your email.' });
	} catch (err) {
		console.error('Error during password reset:', err);
		res.status(500).json({ message: 'Error processing request.', error: err.message });
	}
};

module.exports.verifyotp = async (req, res) => {
	const { email, otp } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
			return res.status(400).json({ msg: 'Invalid or expired OTP.' });
		}

		// OTP is valid, reset OTP fields
		user.otp = undefined;
		user.otpExpires = undefined;
		await user.save();

		res.status(200).json({ message: 'OTP verified successfully. You can now reset your password.' });
	} catch (err) {
		res.status(500).json({ message: 'Error verifying OTP.', error: err.message });
	}
};

module.exports.resetpassword = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ msg: 'User not found' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		user.password = hashedPassword;
		user.confirmPassword = hashedPassword;
		await user.save();

		res.status(200).json({ message: 'Password reset successfully. You can now login with your new password.' });
	} catch (err) {
		res.status(500).json({ message: 'Error resetting password.', error: err.message });
	}
};
