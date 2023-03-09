const express = require('express');
const { saveComment,deleteComment,getComments,getCommentsById } = require('../../controllers/comment.controller');
const router = express.Router();


router
    .route('/')
    .post(saveComment)
    .get(getComments)
router.route('/:id').get(getCommentsById)
router.route('/:id').delete(deleteComment)
module.exports = router;