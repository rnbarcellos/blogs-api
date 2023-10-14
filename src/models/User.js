module.exports = (sequelize, DataTypes) => {
  const UserModel = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    tableName: 'users',
    timestamps: false,
    underscored: true,
  });
  UserModel.associate = function(models) {
    UserModel.hasMany(models.BlogPost, {
      foreignKey: 'userId',
      as: 'blogPosts'
    });
  };
  return UserModel;
}
