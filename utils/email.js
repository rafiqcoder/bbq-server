const nodemailer = require('nodemailer');
const { emailFooter } = require('./EmailTemplate/emailFooter');
const { emailHead,emailUpperBody } = require('./EmailTemplate/emailHead');
const { EmailTemplate } = require('./EmailTemplate/EmailTemplate');
require('dotenv').config();
module.exports.sendEmail = async (req,res) => {
  try {
    const data = req.data;
    // console.log('data',data);
    if (data) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        },
        port: process.env.EMAIL_PORT,
        host: process.env.EMAIL_HOST,
      });
      // console.log('email',data.cus_email);
      const mailOptions = {
        from: process.env.EMAIL,
        to: data.cus_email,
        subject: 'Order Confirmation',
        text: 'Your order has been confirmed',
        html: EmailTemplate(data)
      };
      transporter.sendMail(mailOptions,(error,info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.send({ message: 'Email sent' })
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
}