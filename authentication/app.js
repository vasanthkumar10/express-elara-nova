const express = require("express");
// bcrypt
const bcrypt = require("bcrypt");
const app = express();
const SALT_ROUNDS = 10;

app.use(express.json());

let hashedPassword = "";

app.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  console.log(
    `username - ${username}, password - ${password}, email - ${email}`
  );
  console.log("salt", salt);

  hashedPassword = await bcrypt.hash(password, salt);
  console.log("hashed password", hashedPassword);

  return res.status(201).json({
    msg: "New user registered",
    // data: {
    //   username,
    //   password,
    // },
  });
});

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  console.log("in sign in -> hashed password", hashedPassword);
  //   hashed password from db
  const isValid = await bcrypt.compare(password, hashedPassword);
  console.log("result", isValid);

  if (isValid)
    return res.status(200).json({
      msg: "Logged in successfully",
    });

  return res.status(403).send("Invalid username or password");
});

app.listen(5000, () => console.log("server running on 5000...."));
