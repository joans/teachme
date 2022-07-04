const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "LoginSystem",
});

app.post("/register", (req, res) => {
  console.log(req.body.email);
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "INSERT INTO User (username, email, password) VALUES (?,?,?)",
    [username, email, password],
    (err, result) => {
      console.log(err);
    }
  );
});

app.post("/login", (req, res) => {
  const password = req.body.password;
  const email = req.body.email;

  db.query(
    "SELECT * FROM User WHERE password = ? AND email = ?",
    [password, email],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Wrong Email and password combination" });
      }
    }
  );
});

app.listen(3307, () => {
  console.log("Running server 3307");
});
