module.exports = (sequelize, DataTypes) => {
  const CategoryModel = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: { 
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    tableName: 'categories',
    timestamps: false,
    underscored: true,
  });
  CategoryModel.associate = function(models) {
    // associations can be defined here
  };
  return CategoryModel;
};
