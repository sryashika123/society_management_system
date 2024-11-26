const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',   
    auth: {
        user:"arjun.chauhan@swiftrut.com",
        pass: "npfhjrrnxrlpwgkk"    
    }
});

const sendMail = (to, link ) => {
    const   mailOptions = {
        from:" <arjun.chauhan@swiftrut.com>",
        to: to,
        subject: 'Password Reset Link',
        text: `Your OTP for password reset is: ${link}`,
    };
    return transporter.sendMail(mailOptions);
}

module.exports = {sendMail}