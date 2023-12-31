const { Router } = require('express');
const { categoryController } = require('../controller');
const newCategory = require('../middlewares/newCategory.middleware');
const verifyToken = require('../middlewares/verifyToken.middleware');

const router = Router();

router.post('/', verifyToken, newCategory, categoryController.create);
router.get('/', verifyToken, categoryController.getAll);

module.exports = router;