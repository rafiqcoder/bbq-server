const express = require('express');
const { saveOrder } = require('../../controllers/order.controller');

const router = express.Router();

router 
    .route('/')
    .post(saveOrder)
module.exports = router;