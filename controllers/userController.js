const { User, validateUser } = require("../models/user");
const { generateToken } = require("../authentication/jwt");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function createUser(req, res) {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, email, password, isAdmin } = req.body;

  //   check user existance
  let user = await User.findOne({ email });
  if (user) return res.status(400).send("User already registered....");

  try {
    console.log("Creating new user....");
    user = new User({ name, email, password, isAdmin });
    console.log("before hashing user", user);

    // hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    console.log("after hashing user", user);

    // save it on the db
    const newUser = await user.save();

    // JWT create token
    const token = generateToken({ _id: user._id, email: user.email, isAdmin });

    return res.header("X-Auth-Token", token).status(201).send({
      name: newUser.name,
      email: newUser.email,
    });

    // return res.status(201).json({
    //   msg: "New user registered successfully...",
    //   data: {
    //     name: newUser.name,
    //     email: newUser.email,
    //   }
    // });
  } catch (err) {
    return res.status(500).json({
      msg: "Something went wrong...",
      error: err.message,
    });
  }
}

module.exports = {
  createUser,
};
