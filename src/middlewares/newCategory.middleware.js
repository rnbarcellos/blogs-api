const { validateCategory } = require('../validations/category.validation');
const status = require('../utils/httpStatusCode');

const newCategory = async (req, res, next) => {
  const validation = validateCategory(req.body);
  if (validation) return res.status(status.BAD_REQUEST).json({ message: validation });

  next();
};

module.exports = newCategory;