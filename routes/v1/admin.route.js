const express = require('express');
const { isAdmin } = require('../../controllers/admin.controller');
const { veryfyJwt } = require('../../middleware/verifyJwt');

const router = express.Router();

router.route('/').post(veryfyJwt,isAdmin)

module.exports = router;