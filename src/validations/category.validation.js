const joi = require('joi');

const categorySchema = joi.object({
  name: joi.string().required(),
});

const validateCategory = (data) => {
  const { error } = categorySchema.validate(data);
  if (error) return error.message;
};

module.exports = {
  validateCategory,
};
