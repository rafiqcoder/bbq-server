const express = require('express');
const { sendEmail } = require('../../utils/email');
const router = express.Router();

router.route('/').post(sendEmail)

module.exports = router;
