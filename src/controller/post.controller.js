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

const update = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { email } = req.user;
  const { status, data } = await postService.update(id, title, content, email);

  res.status(status).json(data);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { email } = req.user;
  const { status, data } = await postService.remove(id, email);

  res.status(status).json(data);
};

const search = async (req, res) => {
  const { q } = req.query;
  const { status, data } = await postService.search(q);

  res.status(status).json(data);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  search,
};