const joi = require('joi');

const postSchema = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  categoryIds: joi.array().required(),
}).messages({
  'any.required': 'Some required fields are missing',
  'string.empty': 'Some required fields are missing',
});

const validatePost = (data) => {
  const { error } = postSchema.validate(data);
  if (error) return error.message;
};

module.exports = {
  validatePost,
};