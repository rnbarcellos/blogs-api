const { User } = require('../models');
const { createToken } = require('../auth/jwt');
const httpStatusCode = require('../utils/httpStatusCode');

const invalidFields = { status: httpStatusCode.BAD_REQUEST, data: { message: 'Invalid fields' } };

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user) return invalidFields;
  if (user.password !== password) return invalidFields;

  const token = createToken({ email });

  return { status: httpStatusCode.OK, data: { token } };
};

module.exports = {
  login,
};
