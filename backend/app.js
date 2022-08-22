const express = require("express");
const cors = require("cors");
const { sequelize, User, Post, Category, Like } = require("./models");
const { Op } = require("sequelize");
const { authJwt } = require("./middleware");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("./config/auth.config");

const app = express();
// for cookie-parsing:
// const cookies = require("cookie-parser");

app.use(express.json());
app.use(cors());
// app.use(cookies());

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
        return res.status(404).send({ error: "User Not found." });
      }
      console.log("username: " + password + "found");
      var passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          error: "Invalid Password!",
        });
      }
      var token = jwt.sign({ uuid: user.uuid }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      // alternatively for cookies use this code:
      // res.status(200).cookie('jwt', token).send({
      res.status(200).send({
        uuid: user.uuid,
        username: user.username,
        // email: user.email, // no sensitive info in the front-end
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
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
      include: [{ all: true, nested: true }],
    });

    if (user) {
      return res.json(user);
    } else {
      return res
        .status(404)
        .json({ error: `Couldn't resolve any users with this ID` });
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

app.get(
  "/toggle_like_post/:postuuid",
  authJwt.verifyToken,
  async (req, res) => {
    const postuuid = req.params.postuuid;
    const useruuid = req.userId;
    try {
      const user = await User.findOne({
        where: { uuid: useruuid },
      });
      const post = await Post.findOne({
        where: { uuid: postuuid },
      });
      console.log("I ran until here!");
      console.log(user);
      let like = await Likes.findOne({
        where: { [Op.and]: [{ userID: user.id, postID: post.id }] },
      });
      if (!like) {
        const newLike = await Like.create({
          userID: user.id,
          postID: post.id,
        });
        return res.json(newLike);
      } else {
        await like.destroy();
        return res.send("like deleted");
      }
    } catch (err) {
      console.log(err);
    }
  }
);

app.post("/create_post", authJwt.verifyToken, async (req, res) => {
  const { userUUID, title, category, body } = req.body;

  try {
    const dbUser = await User.findOne({ where: { uuid: userUUID } });
    const dbCategory = await Category.findOne({
      where: { name: category },
    });

    const post = await Post.create({
      title,
      categoryID: dbCategory.id,
      body,
      userID: dbUser.id,
    });

    return res.json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
});

app.put("/update_post", authJwt.verifyToken, async (req, res) => {
  const { userUUID, postUUID, title, category, body } = req.body;

  try {
    const post = await Post.findOne({
      where: { uuid: postUUID },
      include: ["user", "category"],
    });

    const dbCategory = await Category.findOne({
      where: { name: category },
    });
    // is the user from the post the same as the user from the JWT-Token?
    if (post.user.uuid === req.userId) {
      await post.update({ title, body, categoryID: dbCategory.id });
      return res.json(post);
    } else {
      return res
        .status(401)
        .json({ error: "You are unauthorized to perform this action!" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
});

app.get("/categories", async (req, res) => {
  try {
    const categories = await Category.findAll();
    if (categories) {
      return res.json(categories);
    } else {
      return res
        .status(404)
        .json({ error: `Couldn't resolve any categories.` });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
});

app.get("/categories_entries", async (req, res) => {
  try {
    const categories = await Category.findAll({ include: ["posts"] });
    return res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: ["user", "category"],
      limit: 12,
      order: [["createdAt", "DESC"]],
      // Code appends the user data to the corresponding post data
    });

    return res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `Could not find any Posts` });
  }
});

app.get("/search/:searchterm", async (req, res) => {
  const searchquery = req.params.searchterm;

  const querySplit = searchquery.split(" ");
  const querySplitMap = querySplit.map((item) => ({
    [Op.like]: "%" + item + "%",
  }));
  console.log(querySplitMap);

  const options = {
    where: {
      [Op.or]: [
        { body: { [Op.or]: querySplitMap } },
        { title: { [Op.or]: querySplitMap } },
      ],
    },
    include: ["category"],
  };
  try {
    const posts = await Post.findAndCountAll(options);
    return res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

app.get("/posts/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const post = await Post.findOne({
      where: { uuid: uuid },
      include: ["user", "category"],
      // Code appends the user data to the corresponding post data
    });

    if (post) {
      return res.json(post);
    } else {
      return res
        .status(404)
        .json({ error: `Couldn't resolve any Posts with this ID.` });
    }
  } catch (err) {
    console.log(err);

    return res.status(500).json({ error: `Could not find any Post` });
  }
});

app.listen({ port: 3307 }, async () => {
  console.log("Running server http://localhost:3307");
  await sequelize.authenticate();
  console.log("Database Connected!");
});
