const express = require('express');
const PaySuccess = require("../../controllers/pay.controller");

const router = express.Router();

router
    .route('/')
router.route('/:transId').patch(PaySuccess)
module.exports = router;
