const express = require("express");
const { saveMenu, getAllMenu, getMenuById, updateMenuById, deleteMenuById } = require("../../controllers/menu.controller");
const router = express.Router();

router
    .route('/')
    .post(saveMenu)
    .get(getAllMenu)
router.route('/:id').get(getMenuById)
router.route('/:id').delete(deleteMenuById)
router.route('/:id').patch(updateMenuById)

module.exports = router;