const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;
module.exports = function GenerateToken(user) {
  return jwt.sign({ id: user._id }, jwt_secret, {
    expiresIn: "7d",
  });
};
