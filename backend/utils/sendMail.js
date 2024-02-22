const nodeMailer = require("nodemailer");
const { catchAsyncFun } = require("../middleware/asyncFun");

const sendEmail = catchAsyncFun(async (options)=>{

    const transpoter = nodeMailer.createTransport({
        // 
        
        service : process.env.SMTP_SERVICE,
        auth: {
            user : process.env.SMTP_EMAIL,
            pass: process .env.SMTP_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    };
    await transpoter.sendMail(mailOptions); 
})

module.exports = sendEmail;