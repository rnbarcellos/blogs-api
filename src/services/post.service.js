const { Op } = require('sequelize');
const { BlogPost, PostCategory, Category, User } = require('../models');
const httpStatusCode = require('../utils/httpStatusCode');

const create = async (title, content, categoryIds, email) => {
  const categories = await Category.findAll({ where: { id: categoryIds } });
  if (categories.length !== categoryIds.length) {
    return { status: httpStatusCode.BAD_REQUEST,
      data: { message: 'one or more "categoryIds" not found' } };
  }

  const user = await User.findOne({ where: { email } });
  const userId = user.id;

  const post = await BlogPost.create(
    { title, content, userId, published: new Date(), updated: new Date() },
  );
  const postCategories = categoryIds.map((categoryId) => ({
    postId: post.id,
    categoryId,
  }));

  await PostCategory.bulkCreate(postCategories);

  return { status: httpStatusCode.CREATED, data: post };
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    }, {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });

  return { status: httpStatusCode.OK, data: posts };
};

const getById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    }, {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
  });
  if (!post) return { status: httpStatusCode.NOT_FOUND, data: { message: 'Post does not exist' } };

  return { status: httpStatusCode.OK, data: post };
};

const update = async (id, title, content, email) => {
  const post = await BlogPost.findByPk(id);
  if (!post) return { status: httpStatusCode.NOT_FOUND, data: { message: 'Post does not exist' } };

  const user = await User.findOne({ where: { email } });
  if (post.userId !== user.id) {
    return { status: httpStatusCode.UNAUTHORIZED, data: { message: 'Unauthorized user' } };
  }

  await BlogPost.update(
    { title, content, updated: new Date() },
    { where: { id } },
  );
  const updatedPost = await getById(id);

  return { status: httpStatusCode.OK, data: updatedPost.data };
};

const remove = async (id, email) => {
  const post = await BlogPost.findByPk(id);
  if (!post) return { status: httpStatusCode.NOT_FOUND, data: { message: 'Post does not exist' } };

  const user = await User.findOne({ where: { email } });
  if (post.userId !== user.id) {
    return { status: httpStatusCode.UNAUTHORIZED, data: { message: 'Unauthorized user' } };
  }

  await BlogPost.destroy({ where: { id } });

  return { status: httpStatusCode.NO_CONTENT, data: {} };
};

const search = async (q) => {
  const posts = await BlogPost.findAll({
    include: [{
      model: User,
      as: 'user',
      attributes: { exclude: ['password'] },
    }, {
      model: Category,
      as: 'categories',
      through: { attributes: [] },
    }],
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${q}%` } },
        { content: { [Op.like]: `%${q}%` } },
      ],
    },
  });

  return { status: httpStatusCode.OK, data: posts };
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  search,
};