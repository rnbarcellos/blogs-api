const { validatePost } = require('../validations/post.validation');
const status = require('../utils/httpStatusCode');

const newPost = async (req, res, next) => {
  const validation = validatePost(req.body);
  if (validation) return res.status(status.BAD_REQUEST).json({ message: validation });

  next();
};

module.exports = newPost;