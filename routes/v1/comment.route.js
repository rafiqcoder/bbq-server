const express = require('express');
const { saveComment,deleteComment } = require('../../controllers/comment.controller');
const router = express.Router();


router
    .route('/')
    .post(saveComment)
router.route('/:id').delete(deleteComment)
module.exports = router;