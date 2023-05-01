const jwt = require("jsonwebtoken");

function generateToken(obj) {
  return jwt.sign(obj, process.env.JWT_PRIVATE_KEY);
}

module.exports = {
  generateToken,
};
