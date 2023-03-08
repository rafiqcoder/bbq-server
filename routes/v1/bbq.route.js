const express = require('express');
const { getAllBbq,saveBbq,getBbqById, deleteById, updateById } = require('../../controllers/bbq.controller');

const router = express.Router();

router
    .route('/')
    .get(getAllBbq)
    
    .post(saveBbq)
router.route('/:id').get(getBbqById)
router.route('/:id').delete(deleteById)
router.route('/:id').patch(updateById)
// .delete()
module.exports = router;