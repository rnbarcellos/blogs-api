const { postService } = require('../services');

const create = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { email } = req.user;
  const { status, data } = await postService.create(title, content, categoryIds, email);

  res.status(status).json(data);
};

const getAll = async (req, res) => {
  const { status, data } = await postService.getAll();

  res.status(status).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await postService.getById(id);

  res.status(status).json(data);
};

module.exports = {
  create,
  getAll,
  getById,
};