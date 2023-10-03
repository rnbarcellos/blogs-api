const joi = require('joi');

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
}).messages({
  'any.required': 'Some required fields are missing',
  'string.empty': 'Some required fields are missing',
});

const validateLogin = (data) => {
  const { error } = loginSchema.validate(data);
  if (error) return error.message;
};

module.exports = {
  validateLogin,
};
