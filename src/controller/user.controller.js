const { userService } = require('../services');

const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await userService.login(email, password);

  res.status(result.status).json(result.data);
};

module.exports = {
  login,
};