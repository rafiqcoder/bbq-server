const express = require('express');
const { saveUser, getAllUsers } = require('../../controllers/user.controllers');
const errorHandler = require('../../errorHandler');
const router = express.Router();



router
    .route('/')
    .get(getAllUsers)
    .post(saveUser)

module.exports = router;