const { Router } = require('express');
const { postController } = require('../controller');
const newPost = require('../middlewares/newPost.middleware');
const verifyToken = require('../middlewares/verifyToken.middleware');

const router = Router();

router.post('/', verifyToken, newPost, postController.create);

module.exports = router;
