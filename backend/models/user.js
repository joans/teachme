"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post, Like }) {
      // define association here
      this.hasMany(Post, { foreignKey: "userID", as: "posts" });
      this.hasMany(Like, { foreignKey: "userUUID", as: "likedPosts" });
    }

    // overrides the default JSON returned to the user of the API
    toJSON() {
      // hide the "id" and "password"-field in the API as a default behaviour
      return {
        ...this.get(),
        id: undefined,
        password: undefined,
      };
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: /^[\w\d_-]{4,24}$/,
          // Same Regex as in Frontend
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "The E-Mail Address must be given" },
          notEmpty: { msg: "The E-Mail Address cannot be empty" },
          isEmail: { msg: "The E-Mail Address must be valid" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^.{8,64}$/,
          // Same Regex as in Frontend
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      aboutMeText: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      interestedIn: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      languages: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
    }
  );
  return User;
};
