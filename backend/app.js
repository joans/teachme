const express = require("express");
const cors = require("cors");
const { sequelize, User } = require("./models");

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

app.listen({ port: 3307 }, async () => {
  console.log("Running server http://localhost:3307");
  await sequelize.sync({ force: true });
  console.log("Database synced!");
});
