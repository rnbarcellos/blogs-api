const { Router } = require('express');
const { userController } = require('../controller');
const newUserMiddleware = require('../middlewares/newUser.middleware');
const verifyToken = require('../middlewares/verifyToken.middleware');

const router = Router();

router.post('/', newUserMiddleware, userController.create);
router.get('/', verifyToken, userController.getAll);

module.exports = router;