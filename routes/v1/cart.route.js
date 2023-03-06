const express = require('express');
const { savetoCart, getCart } = require('../../controllers/cart.controller');

const router = express.Router();

router
    .route('/')
    .post(savetoCart)
    .get (getCart)
module.exports = router;