const express = require('express');
const {emptyCartitems} = require('../../controllers/emptyCartitems.controller');
const router = express.Router();

router.route('/')
    .patch(emptyCartitems)

module.exports = router;