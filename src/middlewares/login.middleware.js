const { validateLogin } = require('../validations/login.validation');
const status = require('../utils/httpStatusCode');

const login = async (req, res, next) => {
  const validation = validateLogin(req.body);
  if (validation) return res.status(status.BAD_REQUEST).json({ message: validation });

  next();
};

module.exports = login;