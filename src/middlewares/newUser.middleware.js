const { validateUser } = require('../validations/user.validation');
const status = require('../utils/httpStatusCode');

const newUser = async (req, res, next) => {
  const validation = validateUser(req.body);
  if (validation) return res.status(status.BAD_REQUEST).json({ message: validation });

  next();
};

module.exports = newUser;