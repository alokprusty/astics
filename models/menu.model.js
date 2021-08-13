module.exports = (sequelize, Sequelize) => {
  const Menu = sequelize.define(
    "tbl_menu",
    {
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "tbl_category",
          key: "id",
        },
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: "1",
      },
    },
    {
      freezeTableName: true, // Model tableName will be the same as the model name
      indexes: [
        // Create a unique index
        {
          unique: true,
          fields: ["categoryId", "name"],
        },
      ],
    }
  );

  return Menu;
};
