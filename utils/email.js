const nodemailer = require('nodemailer');

module.exports.sendEmail = async (req,res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: env.process.EMAIL,
                pass: env.process.PASSWORD
            },
            port: env.process.EMAIL_PORT,
            host: env.process.EMAIL_HOST,
        });
        const mailOptions = {
            from: env.process.EMAIL,
            to: 'rafiqcoder@gmail.com',
            subject: 'testing NodeMailer',
            text: 'Hello World',
            html: "<h1>Hello World</h1>"
        };
        transporter.sendMail(mailOptions,(error,info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                res.send({ message: 'Email sent' })
            }
        });
    } catch (error) {
        console.log(error);
    }
}