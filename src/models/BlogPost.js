module.exports = (sequelize, DataTypes) => {
  const BlogPostModel = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    tableName: 'BlogPosts',
    timestamps: false,
    underscored: true,
  });
  BlogPostModel.associate = function(models) {
    BlogPostModel.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };
  return BlogPostModel;
}
