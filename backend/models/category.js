"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      // define association here
      this.hasMany(Post, { foreignKey: "categoryID", as: "posts" });
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
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      tableName: "categories",
      modelName: "Category",
    }
  );
  return Category;
};
