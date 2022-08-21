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
      this.belongsTo(Post, { foreignKey: "postID", as: "post" });
      this.belongsTo(User, { foreignKey: "userID", as: "user" });
      // define association here
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
