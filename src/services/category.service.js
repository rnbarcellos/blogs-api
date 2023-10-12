const { Category } = require('../models');
const httpStatusCode = require('../utils/httpStatusCode');

const create = async (name) => {
  await Category.create({ name });
  const category = await Category.findOne({ where: { name } });

  return { status: httpStatusCode.CREATED, data: category };
};

const getAll = async () => {
  const categories = await Category.findAll();

  return { status: httpStatusCode.OK, data: categories };
};

module.exports = {
  create,
  getAll,
};
