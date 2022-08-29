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

const createUserDetails = async (
  username,
  gender,
  aboutMeText,
  interestedIn,
  languages
) => {
  const dbUser = await User.findOne({ where: { username } });
  await dbUser.update({ gender, aboutMeText, interestedIn, languages });
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
  await createUser("Jens", "supersecret", "jens@skillpact.org");
  await createUser("Jessie", "supersecret", "jessie@gmail.de");
  await createUser("Stefan", "supersecret", "stefan@t-online.de");
  await createUser("Tanja", "supersecret", "tanja@posteo.de");
  await createUser("David", "supersecret", "david@gmail.com");
  await createUser("Julia", "supersecret", "julia@hotmail.com");
  await createUser("Thomas", "supersecret", "tim@techlabs.org");
  await createUser("Vanessa", "supersecret", "vanessa@yahoo.de");
  await createUser("Akio", "supersecret", "akio@meta.com");
  await createUser("Sakura", "supersecret", "sakura@gmail.com");
  await createUser("Tina", "supersecret", "kim@meta.com");
  await createUser("Stephanie", "supersecret", "stephanie@posteo.net");
  await createUser("Giuseppe", "supersecret", "giuseppe@posteo.net");
  await createUser("Hanna", "supersecret", "hanna@skillpact.org");
  await createUser("Judith", "supersecret", "judith@wordpress.com");
  await createUser("Florian", "supersecret", "florian@massage-for-all.de");
  await createPost(
    "David",
    "Drawing portraits",
    "art",
    "I'd love to teach you more about drawing. For as long as I can think of, I have been a huge Bob Ross fan. I'd love to create the same love for paiting in you - with guided painting of amazing art!"
  );
  await createUserDetails(
    "David",
    "male",
    "I am David, 32 years old and from the UK. I draw as a hobby and I am a Computer scientist by profession. Looking forward to getting to know other art lovers.",
    "drawing, travelling, reading",
    "English"
  );
  await createPost(
    "Tanja",
    "Photography for your product or service",
    "art",
    "I can help you create professional-looking pictures for your business, online shop, social media, etc. I will teach you everything about equipment, lighting, positioning of your products, etc."
  );
  await createUserDetails(
    "Tanja",
    "female",
    "Hi, I am Tanja. I am a professional photographer based in Hamburg. I grew up in Bogota, Colombia and moved here quite recently. I would love to teach my passion to other people.",
    "meeting people, photograhy, cooking",
    "Spanish, English"
  );
  await createPost(
    "Jens",
    "Learn how to use photoshop",
    "art",
    "Touch up, manipulate, or recreate your imagination in photoshop. I will teach you fundamental skills to get started in photoshop."
  );
  await createUserDetails(
    "Jens",
    "male",
    "Hi, I am Jens and I am interested in cooking and learning new skills. I love to inspire people and help them learn new skills!",
    "cooking, photography, freediving",
    "German, English"
  );
  await createPost(
    "Sakura",
    "How to decorate your home",
    "art",
    "I am an interior designer and I am on a mission to make as many homes feel like home as possible. If you are looking for decoration tips, do not hesitate to contact me. I will help you make the most comfortable version of your home with the available things you already own."
  );
  await createUserDetails(
    "Sakura",
    "diverse",
    "Hello people! My name is Sakura and I am an Interior Designer. I saw how German people decorate their homes and I am interested to help you out!",
    "art, sports, languages",
    "Japanese, English"
  );
  await createPost(
    "Akio",
    "Cartoon styled art",
    "art",
    "Hello, I can teach you how to do very simple cartoon drawing! Once you get to know these basics, you can become an artist or cartoonist in no time!"
  );
  await createUserDetails(
    "Akio",
    "male",
    "Welcome to my Profile! I am Akio and I like to draw in my free time. Since I was little, drawing was a hobby of mine. I am also interested in travelling and photography.",
    "art, travelling",
    "Japanese, German, English"
  );
  await createPost(
    "Stephanie",
    "How to write a short story",
    "art",
    "Get to know the basics on how to write your own short story. We will develop your characters and plot together. I am happy to help you with copy-editing as well. I have been writing my own stories for 10 years now and have just published my first novel."
  );
  await createUserDetails(
    "Stephanie",
    "female",
    "Hello everyone! I am Stephanie. I am from Hamburg and love the city, but I am also a huge fan of the countryside and loved spending the summers at my grandparents' farm. This is also where I had the idea for my first novel.",
    "writing, cooking, backing",
    "German, English"
  );
  await createPost(
    "Julia",
    "Build your own table",
    "handicraft",
    "You want to know how to build a table? I will teach you every step of how to do exactly that! I have just finished renovating my dream house - an old farm house in the countryside - and I have built most of the furniture myself."
  );
  await createUserDetails(
    "Julia",
    "female",
    "Hi, I am Julia. I love breaking chlichés, so I bought an old farm house and renovated it by myself. I am always looking for a next fun project - maybe we could start one together?!",
    "DIY, gardening, dogs",
    "French, English"
  );
  await createPost(
    "Sakura",
    "Upcycling Christmas gifts",
    "handicraft",
    "I believe that anything you can be upcycled and used for another purpose. The idea of this offer is to identify things we own, but do not need anymore to upcycle them into a perfect gift for Christmas for a loved one."
  );
  await createPost(
    "Julia",
    "Green balcony - How to...",
    "handicraft",
    "You would like to vegetate your balcony, but you don't know how and where to start? I can help you pick the right plants for your balcony and provide basic tips on how to grow and take care of your plants."
  );
  await createPost(
    "Sakura",
    "DIY macrame hanging basket",
    "handicraft",
    "You've always wanted to make use of that bad looking hook in your ceiling? Why not use it to hang a plant in your DIY macrame hanging basket? I will help you pick the right yarn and yarn lengths, and teach you 4 different kinds of knot styles."
  );
  await createPost(
    "Stefan",
    "Basic fitness at no cost",
    "sports_fitness",
    "I can teach you about calisthenics. Never heard about it before? We use our bodyweight to form strength by excercising large muscle groups. We perform movements such as pulling, pushing, bending, jumping, or swinging. As there are no extra costs for equipment, there are also no excuses! ;-)"
  );
  await createUserDetails(
    "Stefan",
    "male",
    "Hey guys, I am Stefan. I am a personal fitness trainer. I am currently studying to become a doctor and work as an instructor at a local gym on the side. Always up for a nice sports actiivty!",
    "sports, muscles, partying",
    "German, English"
  );
  await createPost(
    "Vanessa",
    "Dribbling like a pro",
    "sports_fitness",
    "Looking to pass on some of my dribbling skills to some other fellow football fans. I have been playing soccer since I was 5 years old and think I have some good skills to pass on to others wanting to learn."
  );
  await createUserDetails(
    "Vanessa",
    "diverse",
    "Hello, I am Vanessa. I play soccer in a local team and I am interested in everything that has to do with a healty diet. Anyone else who is a real health foodie?",
    "cooking, fitness, soccer",
    "Dutch, English"
  );
  await createPost(
    "Florian",
    "Ease stress and pain with self-massage",
    "sports_fitness",
    "If you're feeling tense or sore, massage therapy may help you feel better. Luckily, you don't always need to see a massage therapist to reap the rewards. For some types of ailments or simply for the joy of it, a self-massage can be beneficial, too. If you'd like to try self-massage for pain relief, I can teach you some of the best and safest self-massage techniques to try at home."
  );
  await createPost(
    "Judith",
    "Your first handstand",
    "sports_fitness",
    "A handstand is one of the coolest exercises ever, but it's also one of the most advanced moves to learn. But you are lucky and have come to the right place. I would consider myself advanced handstander. I can easily stand on my hands for hours on end if I feel like it and I do feel like it a lot - it is just so much fun! I will teach you how to do a handstand step-by-step, starting with the right warm-up, doing a handstand on the wall, until you can do a free-standing handstand."
  );
  await createPost(
    "Thomas",
    "Get ready for your first triathlon",
    "sports_fitness",
    "I am an experienced triathlete and can help you plan your approach to the sport, which can be overwhelming. This is what I can help you with: - how to get started - how to effectively transition from another sport - how to create a realistic training plan  - how to know when you are ready for your first race - how to identify weaknesses and work on them - how to fit things into the rest of your life."
  );
  await createPost(
    "Akio",
    "Chess",
    "sports_fitness",
    "You want to learn chess to be able to beat your parents or grandparents? Or join your schools' or universities' chess club with a bit of a head start? I will be happy to help you with chess. My FIDE rating is currently 2100. Ask google to find out what that means, or I can tell you during our first session."
  );
  await createPost(
    "Jessie",
    "I will teach you to make pasta aglio e olio from scratch",
    "cooking",
    "I love to make pasta and I want to share with you the love for this simple, but amazing dish!"
  );
  await createPost(
    "Tina",
    "Most probably your favourite Udon bowl",
    "cooking",
    "I will teach you how to cook your favourite Udon bowl. You will learn how to properly cook the Udon noodles and how to pick the side ingredients that will taste you best. If I like you, I will also share my secret sauce recipe with you. ;-)"
  );
  await createPost(
    "Stepanie",
    "How to make your own jams",
    "cooking",
    "The recipes I would like to share here are my grandma's. She just made the best jam I have ever tasted and thanks to her dedication and pacience in teaching me how to make her jam myself, I believe mine are just as good. As I do not have grandchildren of my own (yet), I would love to spread the recipes as widely as I can. They are simply too good to not be shared."
  );
  await createPost(
    "Hanna",
    "Minion motive cake",
    "cooking",
    "I just love the minions movie, and I know I am not the only one! I have perfected my minion cake recipe over the course of 3 years and I believe it is now ready to be shared with the world. I am happy to share and assist to make the minion fans out there happy!"
  );
  await createPost(
    "Vanessa",
    "Energy balls to get you through the day",
    "cooking",
    "Are you a snack lover just like myself? Then I can only recommend you to always have some energy balls near by. I can teach you several different recipies with and witout nuts, coconut, different kinds of fruit. We will definitely find something that tastes you!"
  );
  await createPost(
    "Jens",
    "Sushi - made easy",
    "cooking",
    "You like sushi as much as I do and dislike its costs in the restaurants just as much? You feel the same way and would like to make your own sushi for your friends and yourself? Hit me up and I will teach you how to make your own sushi. It is very easy and even though I am not a professional chef, everyone has liked my sushi so far. ;-)"
  );
  await createPost(
    "Giuseppe",
    "Delicious tiramisu",
    "cooking",
    "Probably the best desert on earth and well...it is also quite easy to make it yourself, if you know how. I am happy to teach you how to make a really good tiramisu - the original way with coffee and bisquit."
  );
  await createUserDetails(
    "Guiseppe",
    "male",
    "Hello everyone, my name is Guiseppe. I am from Italy and have moved to Germany for studying. I would like to get to know some new people and thought it would be nice to connect over food.",
    "getting to know new people, deserts, foreign cultures",
    "Italian, English"
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
