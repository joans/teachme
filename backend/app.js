const express = require("express");
const cors = require("cors");
const { sequelize, User, Post, Category } = require("./models");
const { Op } = require("sequelize");
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
      include: [{ all: true, nested: true }],
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
    res.status(500).json(err);
  }
});

app.get("/categories", async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.get("/categories_entries", async (req, res) => {
  try {
    const categories = await Category.findAll({ include: ["posts"] });
    return res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: ["user", "category"],
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
    // include: ["user"],
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
    const posts = await Post.findOne({
      where: { uuid: uuid },
      include: ["user", "category"],
      // Code appends the user data to the corresponding post data
    });

    return res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `Could not find any Posts` });
  }
});

const createCategory = async (name, displayName) => {
  try {
    const category = await Category.create({
      name: name,
      displayName: displayName,
    });
  } catch (err) {
    console.log(err);
  }
};

// route for initializing the categories for the user
const createDefaultCategories = () => {
  createCategory("handicraft", "Handicraft");
  createCategory("sports_fitness", "Sports/Fitness");
  createCategory("art", "Art");
  createCategory("cooking", "Cooking");
};

// // No public route for creating categories!
// app.post("/categories/create", async (req, res) => {
//   const { name, displayName } = req.body;

//   createCategory(name, displayName);
// });

app.listen({ port: 3307 }, async () => {
  console.log("Running server http://localhost:3307");
  await sequelize.authenticate();
  console.log("Database Connected!");
});

// // Table creation with the following function:
// async function main() {
//   await sequelize.sync();
//   createDefaultCategories();
// }

// main();
