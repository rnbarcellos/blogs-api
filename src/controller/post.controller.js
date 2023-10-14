const { postService } = require('../services');

const create = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { email } = req.user;
  const { status, data } = await postService.create(title, content, categoryIds, email);

  res.status(status).json(data);
};

module.exports = {
  create,
};