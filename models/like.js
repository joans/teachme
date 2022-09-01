"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post, User }) {
      this.belongsTo(Post, { foreignKey: "postUUID", as: "post" });
      this.belongsTo(User, { foreignKey: "userUUID", as: "user" });
      // define association here
    }
    toJSON() {
      // hide the "id" and "password"-field in the API as a default behaviour
      return {
        ...this.get(),
        id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
      };
    }
  }
  Like.init(
    {
      // name: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "likes",
      modelName: "Like",
    }
  );
  return Like;
};
