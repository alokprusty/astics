module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define(
    "tbl_category",
    {
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: "1",
      },
    },
    {
      freezeTableName: true, // Model tableName will be the same as the model name
    }
  );

  return Category;
};
