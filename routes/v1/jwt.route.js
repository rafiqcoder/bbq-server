const express = require('express');
const { getJwt } = require('../../controllers/jwt.controller');
const router = express.Router();

router.route('/').post(getJwt)

module.exports = router;