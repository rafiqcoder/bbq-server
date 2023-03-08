const express = require('express');
const { saveOrder,updateOrderById } = require('../../controllers/order.controller');

const router = express.Router();

router
    .route('/')
    .post(saveOrder)
router.route('/:id').patch(updateOrderById)
module.exports = router; 