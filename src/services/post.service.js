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

module.exports = {
  create,
  getAll,
};