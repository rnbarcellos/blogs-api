const { categoryService } = require('../services');

const create = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await categoryService.create(name);

  res.status(status).json(data);
};

module.exports = {
  create,
};
