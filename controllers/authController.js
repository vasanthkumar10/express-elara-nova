const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { generateToken } = require("../authentication/jwt");

async function login(req, res) {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  //   check email and password
  let user = await User.findOne({ email });
  if (!user) return res.status(404).send("User not registered");

  try {
    // compare passwords
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).send("Invalid email or password....");

    // JWT create token
    const token = generateToken({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    });

    return res.header("X-Auth-Token", token).status(200).json({
      msg: "User logged in successfully",
      login: true,
    });

    // return res.status(200).json({
    //   msg: "User logged in successfully",
    //   login: true,
    // });
  } catch (err) {
    return res.status(500).json({
      msg: "Something went wrong...",
      error: err.message,
      login: false,
    });
  }
}

const validate = (obj, body) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  return schema.validate(body);
};

module.exports = {
  login,
};
