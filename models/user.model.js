module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "tbl_user",
    {
      username: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(255),
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
    }
  );

  return User;
};
