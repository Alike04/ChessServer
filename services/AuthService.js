const User = require("../models/User")
const jwt = require("jsonwebtoken");
const { createUser } = require("../services/UserService");
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
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email is taken")
  }
  const user = await createUser(userBody);
  const token = generateToken(user)
  return token;
};
const login = async (email, password) => {
  const user = await getUserByEmail(email);
  if (user.password !== password) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Authorization fail");
  }
  return generateToken(user);
};

module.exports = { register, login }

