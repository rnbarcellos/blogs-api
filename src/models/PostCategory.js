module.exports = (sequelize, DataTypes) => {
  const PostCategoryModel = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'post_id',
      references: {
        model: 'BlogPost',
        key: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'category_id',
      references: {
        model: 'Category',
        key: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    },
  }, {
    tableName: 'posts_categories',
    timestamps: false,
    underscored: true,
  });
  PostCategoryModel.associate = function({ BlogPost, Category}) {
    BlogPost.belongsToMany(Category, {
      as: 'categories',
      through: PostCategoryModel,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    Category.belongsToMany(BlogPost, {
      as: 'blogPosts',
      through: PostCategoryModel,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
  return PostCategoryModel;
}