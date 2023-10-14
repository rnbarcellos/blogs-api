const { validateUpdate } = require('../validations/post.validation');
const status = require('../utils/httpStatusCode');

const updatePost = async (req, res, next) => {
  const validation = validateUpdate(req.body);
  if (validation) return res.status(status.BAD_REQUEST).json({ message: validation });

  next();
};

module.exports = updatePost;