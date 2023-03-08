const express = require('express');
const { saveUser,getAllUsers,updateUserById,deleteUserById } = require('../../controllers/user.controllers');
const router = express.Router();



router
    .route('/')
    .get(getAllUsers)
    .post(saveUser)
    .patch(updateUserById)
router.route('/:id').delete(deleteUserById)

module.exports = router;