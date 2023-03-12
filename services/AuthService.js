const User = require("../models/User")
const jwt = require("jsonwebtoken");
const { createUser, getUserByEmail } = require("../services/UserService");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError")

const generateToken = (user) => {
  const token = jwt.sign(
    {
      email: user.email,
      userId: user._id,
    },
    "Jfjk14hJfjk1fhjd",
    {
      expiresIn: "10h",
    }
  );
  return token;
};

const register = async (userBody) => {
  const user = await createUser(userBody);
  const token = generateToken(user)
  return { token: token, user: user };
};
const login = async (email, password) => {
  const user = await getUserByEmail(email);
  if (user.password !== password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Authorization fail");
  }
  const token = generateToken(user);
  return { token: token, user: user }
};

module.exports = { register, login }

