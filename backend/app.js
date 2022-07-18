const express = require("express");
const cors = require("cors");
const { sequelize, User, Post } = require("./models");
const { authJwt } = require("./middleware");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("./config/auth.config");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
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
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("test");
  await User.findOne({
    where: {
      username: username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      console.log("username: " + password + "found");
      var passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      var token = jwt.sign({ uuid: user.uuid }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      res.status(200).send({
        uuid: user.uuid,
        username: user.username,
        // email: user.email, // no sensitive info in the front-end
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
});

app.get("/users", authJwt.verifyToken, async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ["uuid", "username"] });

    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: `Couldn't resolve users` });
  }
});

app.get("/users/:uuid", authJwt.verifyToken, async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({
      where: { uuid: uuid },
      include: ["posts"],
    });

    return res.json(user);
  } catch (err) {
    return res
      .status(500)
      .json({ error: `Couldn't resolve the user with UUID ${uuid}` });
  }
});

app.post("/create_post", authJwt.verifyToken, async (req, res) => {
  const { userUUID, title, category, body } = req.body;

  try {
    const user = await User.findOne({ where: { uuid: userUUID } });

    const post = await Post.create({ title, category, body, userID: user.id });

    return res.json(post);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: `Could not create Post with UUID ${userUUID}` });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: ["user"],
      // Code appends the user data to the corresponding post data
    });

    return res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `Could not find any Posts` });
  }
});

app.get("/posts/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const posts = await Post.findOne({
      where: { uuid: uuid },
      include: ["user"],
      // Code appends the user data to the corresponding post data
    });

    return res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `Could not find any Posts` });
  }
});

app.listen({ port: 3307 }, async () => {
  console.log("Running server http://localhost:3307");
  await sequelize.authenticate();
  console.log("Database Connected!");
});
