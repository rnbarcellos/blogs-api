const { userService } = require('../services');

const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await userService.login(email, password);

  res.status(result.status).json(result.data);
};

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const result = await userService.create(displayName, email, password, image);

  res.status(result.status).json(result.data);
};

const getAll = async (req, res) => {
  const result = await userService.getAll();

  res.status(result.status).json(result.data);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const result = await userService.getById(id);

  res.status(result.status).json(result.data);
};

const deleteById = async (req, res) => {
  const { email } = req.user;

  const result = await userService.deleteById(email);

  res.status(result.status).json(result.data);
};

module.exports = {
  login,
  create,
  getAll,
  getById,
  deleteById,
};