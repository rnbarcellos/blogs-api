const joi = require('joi');

const userSchema = joi.object({
  displayName: joi.string().min(8).required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  image: joi.string(),
});

const validateUser = (data) => {
  const { error } = userSchema.validate(data);
  if (error) return error.message;
};

module.exports = {
  validateUser,
};
