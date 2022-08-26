"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Category, Like }) {
      // define association here
      this.belongsTo(User, { foreignKey: "userID", as: "user" });
      this.belongsTo(Category, { foreignKey: "categoryID", as: "category" });
      this.hasMany(Like, { foreignKey: "postUUID", as: "likedBy" });
    }
    toJSON() {
      // hide the "id" and "password"-field in the API as a default behaviour
      return {
        ...this.get(),
        id: undefined,
        userID: undefined,
        categoryID: undefined,
      };
    }
  }
  Post.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "posts",
      modelName: "Post",
    }
  );
  return Post;
};
