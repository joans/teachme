const db = require("../models");
const config = require("../config/auth.config");
const { sequelize, User, Post } = require("../models");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.signup = async (req, res) => {
  // Save User to Database
  const { username, password, email } = req.body;
  try {
    const user = await User.create({
      username: username,
      password: bcrypt.hashSync(password),
      email: email,
    });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
}};
exports.signin = async (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};