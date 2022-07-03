const express = require("express");
const cors = require("cors");
const { sequelize, User, Post } = require("./models");
const { raw } = require("mysql");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const user = await User.create({ username, password, email });

    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ["uuid", "username"] });

    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: `Couldn't resolve users` });
  }
});

app.get("/users/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({ where: { uuid: uuid } });

    return res.json(user);
  } catch (err) {
    return res
      .status(500)
      .json({ error: `Couldn't resolve the user with UUID ${uuid}` });
  }
});

app.post("/create_post", async (req, res) => {
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

app.listen({ port: 3307 }, async () => {
  console.log("Running server http://localhost:3307");
  await sequelize.authenticate();
  console.log("Database Connected!");
});
