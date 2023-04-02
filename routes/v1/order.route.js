const express = require('express');
const { saveOrder,updateOrderById } = require('../../controllers/order.controller');
const { sendEmail } = require('../../utils/email');

const router = express.Router();

router
    .route('/')
    .post(saveOrder,sendEmail)
router.route('/:id').patch(updateOrderById)
module.exports = router; 