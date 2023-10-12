const { Router } = require('express');
const { userController } = require('../controller');
const newUserMiddleware = require('../middlewares/newUser.middleware');

const router = Router();

router.post('/', newUserMiddleware, userController.create);

module.exports = router;