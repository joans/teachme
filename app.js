const express = require("express");
const cors = require("cors");
const { sequelize, User, Post, Category, Like } = require("./models");
const { Op } = require("sequelize");
const { authJwt } = require("./middleware");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("./config/auth.config");
const path = require("path");

const appPort = process.env.PORT || 3307;

const app = express();
// for cookie-parsing:
// const cookies = require("cookie-parser");

if (process.env.NODE_ENV === "production") {
  //server static content
  // npm run build
  app.use(express.static(path.join(__dirname, "frontend/build")));
}
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

app.put("/users/update/core", authJwt.verifyToken, async (req, res) => {
  // no password since password is not stored in the front end
  // so if user would want to change something about them
  // they would always have to type in their password
  // likewise, if a user would like to change his password
  // they would not need to confirm their current password
  // which is bad design.
  const { username, email, gender, aboutMeText, interestedIn, languages } =
    req.body;
  const userUUID = req.userId;

  try {
    const dbUser = await User.findOne({
      where: { uuid: userUUID },
    });
    await dbUser.update({
      username,
      email,
      gender,
      aboutMeText,
      interestedIn,
      languages,
    });
    return res.json(dbUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
});

app.put("/users/update/password", authJwt.verifyToken, async (req, res) => {
  const { prevPassword, newPassword } = req.body;
  const userUUID = req.userId;

  try {
    const dbUser = await User.findOne({
      where: { uuid: userUUID },
    });
    const passwordValid = bcrypt.compareSync(prevPassword, dbUser.password);
    if (passwordValid) {
      await dbUser.update({
        password: newPassword,
      });
      return res.json(dbUser);
    } else {
      return res.json({ msg: "invalid Password" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
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
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          error: "Invalid Password!",
        });
      }
      const token = jwt.sign({ uuid: user.uuid }, config.secret, {
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

//public route for user information
app.get("/user_lite/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const user = await User.findOne({
      where: { uuid: uuid },
      attributes: ["uuid", "username"],
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
    // toggles likes, if a like is already set, it is deleted by this route
    // if a like is not set yet, it is created
    const postuuid = req.params.postuuid;
    const useruuid = req.userId;
    try {
      // find out if the like already exists
      let like = await Like.findOne({
        where: { [Op.and]: [{ userUUID: useruuid }, { postUUID: postuuid }] },
      });
      if (!like) {
        // if no like exists (is found), then fetch the user and post object
        // from the database to create the associations to their models
        const user = await User.findOne({
          where: { uuid: useruuid },
        });
        const post = await Post.findOne({
          where: { uuid: postuuid },
        });
        const newLike = await Like.create({
          userUUID: user.uuid,
          postUUID: post.uuid,
        });
        return res.json({ msg: "created like" });
      } else {
        await like.destroy();
        return res.json({ msg: "deleted like" });
      }
    } catch (err) {
      console.log(err);
    }
  }
);

// returns only a list of liked posts UUIDs, nothing more
app.get("/fetch_likes/:useruuid", async (req, res) => {
  // likes are public by default, no auth necessary!

  const { useruuid } = req.params;

  try {
    const likes = await Like.findAll({
      where: { userUUID: useruuid },
      attributes: { exclude: ["userUUID"] },
    });
    if (likes) {
      return res.json(likes);
    } else {
      return res.json({ err: "Nothing found" });
    }
  } catch (err) {
    console.log(err);
  }
});

// this route fetches the likes for a user and returns the corresponding posts
// so each user can have a like-page with all their liked posts!
app.get("/fetch_likes_posts/:useruuid", async (req, res) => {
  // likes are public by default, no auth necessary!

  const { useruuid } = req.params;

  try {
    const likes = await Like.findAll({
      where: { userUUID: useruuid },
      attributes: { exclude: ["userUUID"] },
    });
    if (likes) {
      // map the likes to a new list object with the correct "uuid" key instead
      // of the "postUUID" key which is default for the likes object
      const likedPostsUuidsSelect = likes.map((item) => {
        return { uuid: item.postUUID };
      });
      const likedPosts = await Post.findAll({
        where: { [Op.or]: likedPostsUuidsSelect },
        include: ["category"],
      });

      console.log(likedPosts);
      return res.json(likedPosts);
      // return res.json({ msg: "success" });
    } else {
      return res.json({ err: "Nothing found" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/create_post", authJwt.verifyToken, async (req, res) => {
  const { title, category, body } = req.body;
  const userUUID = req.userId;

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
  const { postUUID, title, category, body } = req.body;
  const userUUID = req.userId;

  try {
    const post = await Post.findOne({
      where: { uuid: postUUID },
      include: ["user", "category"],
    });

    const dbCategory = await Category.findOne({
      where: { name: category },
    });
    // is the user from the post the same as the user from the JWT-Token?
    if (post.user.uuid === userUUID) {
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

app.delete("/delete_post/:postuuid", authJwt.verifyToken, async (req, res) => {
  const postuuid = req.params.postuuid;
  const useruuid = req.userId;

  try {
    const post = await Post.findOne({
      where: { uuid: postuuid },
      include: ["user"],
    });

    // is the user from the post the same as the user from the JWT-Token?
    if (post.user.uuid === useruuid) {
      await post.destroy({ where: { uuid: postuuid } });
      return res
        .status(200)
        .json({ message: "Post with uuid " + postuuid + " deleted" });
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
      limit: 16,
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

app.listen({ port: appPort }, async () => {
  console.log(`Running server http://localhost:${appPort}`);
  await sequelize.authenticate();
  console.log("Database Connected!");
});
