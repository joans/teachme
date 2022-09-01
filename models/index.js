"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
require("dotenv").config();
// import { ConnectionString } from "connection-string";

const devConfig = {
  database: process.env.MYSQL_DB,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PW,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  dialect: process.env.MYSQL_DIALECT,
};

// const conString = new ConnectionString(process.env.CLEARDB_DATABASE_URL);

// const deployConfig = {
//   connectionString: process.env.CLEARDB_DATABASE_URL, // heroku cleardb addon
//   dialect: "mysql",
// };

const db = {};

let sequelize;
sequelize = new Sequelize(devConfig);
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(
//     config.database,
//     config.username,
//     config.password,
//     config
//   );
// }

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
