module.exports = (sequelize, DataTypes) => {
  const UserModel = sequelize.define('User', {
    id: DataTypes.INTEGER,
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
    // associations can be defined here
  };
  return UserModel;
}
