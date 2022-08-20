const { sequelize, User, Post, Category } = require("../models");
const bcrypt = require("bcryptjs");

const createCategory = async (name, displayName, symbol) => {
  try {
    const category = await Category.create({
      name: name,
      displayName: displayName,
      symbol: symbol,
    });
  } catch (err) {
    console.log(err);
  }
};

const createUser = async (username, password, email) => {
  try {
    const user = await User.create({
      username,
      password: bcrypt.hashSync(password),
      email,
    });
    return user;
  } catch (err) {
    console.log(err);
  }
};

const createPost = async (username, title, category, body) => {
  try {
    const dbUser = await User.findOne({ where: { username } });
    const dbCategory = await Category.findOne({
      where: { name: category },
    });
    const post = await Post.create({
      title,
      categoryID: dbCategory.id,
      body,
      userID: dbUser.id,
    });
  } catch (err) {
    console.log(err);
  }
};

// route for initializing the categories for the user
const createDefaultCategories = () => {
  createCategory(
    "handicraft",
    "Handicraft",
    "IoHammer"
    // "M280.16 242.79l-26.11-26.12a32 32 0 00-45.14-.12L27.38 384.08c-6.61 6.23-10.95 14.17-11.35 23.06a32.11 32.11 0 009.21 23.94l39 39.43a.46.46 0 00.07.07A32.29 32.29 0 0087 480h1.18c8.89-.33 16.85-4.5 23.17-11.17l168.7-180.7a32 32 0 00.11-45.34zM490 190l-.31-.31-34.27-33.92a21.46 21.46 0 00-15.28-6.26 21.89 21.89 0 00-12.79 4.14c0-.43.06-.85.09-1.22.45-6.5 1.15-16.32-5.2-25.22a258 258 0 00-24.8-28.74.6.6 0 00-.08-.08c-13.32-13.12-42.31-37.83-86.72-55.94A139.55 139.55 0 00257.56 32C226 32 202 46.24 192.81 54.68a119.92 119.92 0 00-14.18 16.22 16 16 0 0018.65 24.34 74.45 74.45 0 018.58-2.63 63.46 63.46 0 0118.45-1.15c13.19 1.09 28.79 7.64 35.69 13.09 11.7 9.41 17.33 22.09 18.26 41.09.18 3.82-7.72 18.14-20 34.48a16 16 0 001.45 21l34.41 34.41a16 16 0 0022 .62c9.73-8.69 24.55-21.79 29.73-25 7.69-4.73 13.19-5.64 14.7-5.8a19.18 19.18 0 0111.29 2.38 1.24 1.24 0 01-.31.95l-1.82 1.73-.3.28a21.52 21.52 0 00.05 30.54l34.26 33.91a21.45 21.45 0 0015.28 6.25 21.7 21.7 0 0015.22-6.2l55.5-54.82c.19-.19.38-.39.56-.59A21.87 21.87 0 00490 190z"
  );
  createCategory(
    "sports_fitness",
    "Sports/Fitness",
    "FaRunning"
    // "M272 96c26.51 0 48-21.49 48-48S298.51 0 272 0s-48 21.49-48 48 21.49 48 48 48zM113.69 317.47l-14.8 34.52H32c-17.67 0-32 14.33-32 32s14.33 32 32 32h77.45c19.25 0 36.58-11.44 44.11-29.09l8.79-20.52-10.67-6.3c-17.32-10.23-30.06-25.37-37.99-42.61zM384 223.99h-44.03l-26.06-53.25c-12.5-25.55-35.45-44.23-61.78-50.94l-71.08-21.14c-28.3-6.8-57.77-.55-80.84 17.14l-39.67 30.41c-14.03 10.75-16.69 30.83-5.92 44.86s30.84 16.66 44.86 5.92l39.69-30.41c7.67-5.89 17.44-8 25.27-6.14l14.7 4.37-37.46 87.39c-12.62 29.48-1.31 64.01 26.3 80.31l84.98 50.17-27.47 87.73c-5.28 16.86 4.11 34.81 20.97 40.09 3.19 1 6.41 1.48 9.58 1.48 13.61 0 26.23-8.77 30.52-22.45l31.64-101.06c5.91-20.77-2.89-43.08-21.64-54.39l-61.24-36.14 31.31-78.28 20.27 41.43c8 16.34 24.92 26.89 43.11 26.89H384c17.67 0 32-14.33 32-32s-14.33-31.99-32-31.99z"
  );
  createCategory(
    "art",
    "Art",
    "FaPalette"
    // "M204.3 5C104.9 24.4 24.8 104.3 5.2 203.4c-37 187 131.7 326.4 258.8 306.7 41.2-6.4 61.4-54.6 42.5-91.7-23.1-45.4 9.9-98.4 60.9-98.4h79.7c35.8 0 64.8-29.6 64.9-65.3C511.5 97.1 368.1-26.9 204.3 5zM96 320c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm32-128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128-64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"
  );
  createCategory(
    "cooking",
    "Cooking",
    "GiCookingPot"
    // "M256 100c-8 0-16 4-32 12l10.848 32.543C179.665 147.226 112.76 160.04 98.68 183h314.625c-7.012-11.422-27.093-20.334-52.305-26.738V135h-18v17.266c-21.203-4.107-44.4-6.68-65.848-7.723L288 112c-16-8-24-12-32-12zM96 201v14H55v18h41v151c0 16 16 32 32 32h256c16 0 32-16 32-32V233h41v-18h-41v-14H96z"
  );
};

const createDefaultUsersAndPosts = async () => {
  await createUser("Jean", "supersecret", "zoe@gmail.com");
  await createUser("Jens", "supersecret", "jens@techlabs.com");
  await createUser("Annika", "supersecret", "annika@techlabs.com");
  await createPost(
    "Jean",
    "Drawing portraits",
    "art",
    "I'd love to teach you more about drawing. I was drawing portraits since I was five years old and I would love to teach you how to draw amazing art!"
  );
  await createPost(
    "Jens",
    "I will teach you to make pasta from scratch",
    "cooking",
    "I love to make pasta and I want to share with you the love for this simple but amazing dish!"
  );
  await createPost(
    "Annika",
    "Cooking Udon",
    "cooking",
    "I will teach you how to cook udon properly."
  );
  await createPost(
    "Jens",
    "Basic Fitness",
    "sports_fitness",
    "I can teach you about calisthenics."
  );
  await createPost(
    "Annika",
    "Build a Table",
    "handicraft",
    "You want to know how to build a table? I will teach you every step of the way how to do exactly that!"
  );
};

// // No public route for creating categories!
// app.post("/categories/create", async (req, res) => {
//   const { name, displayName } = req.body;

//   createCategory(name, displayName);
// });

// Table creation with the following function:
async function main() {
  await sequelize.sync();
  createDefaultCategories();
  createDefaultUsersAndPosts();
}

main();
