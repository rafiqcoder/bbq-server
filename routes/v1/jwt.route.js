const express = require('express');
const { getJwt } = require('../../controllers/jwt.controller');
const router = express.Router();

router.route('/').get(getJwt)

module.exports = router;