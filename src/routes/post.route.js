const { Router } = require('express');
const { postController } = require('../controller');
const newPost = require('../middlewares/newPost.middleware');
const updatePost = require('../middlewares/updatePost.middleware');
const verifyToken = require('../middlewares/verifyToken.middleware');

const router = Router();

router.get('/search', verifyToken, postController.search);
router.post('/', verifyToken, newPost, postController.create);
router.get('/', verifyToken, postController.getAll);
router.get('/:id', verifyToken, postController.getById);
router.put('/:id', verifyToken, updatePost, postController.update);
router.delete('/:id', verifyToken, postController.remove);

module.exports = router;
