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

module.exports = {
  login,
  create,
};