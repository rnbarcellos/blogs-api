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

const create = async (displayName, email, password, image) => {
  const userExists = await User.findOne({ where: { email } });

  if (userExists) {
    return {
      status: httpStatusCode.CONFLICT,
      data: { message: 'User already registered' },
    };
  }
  
  await User.create({ displayName, email, password, image });

  const token = createToken({ email });

  return { status: httpStatusCode.CREATED, data: { token } };
};

const getAll = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return { status: httpStatusCode.OK, data: users };
};

module.exports = {
  login,
  create,
  getAll,
};
