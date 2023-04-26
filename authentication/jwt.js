const jwt = require("jsonwebtoken");

function generateToken(obj) {
  return jwt.sign(obj, "JWTPrivateKey");
}

module.exports = {
  generateToken,
};
