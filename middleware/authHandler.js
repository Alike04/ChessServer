const { getUserById } = require("../services/UserService");
const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const result = jwt.verify(token, process.env.SECRET);
    const { userId } = result;
    const user = await getUserById(userId);
    req.user = user;
    next();
  } catch {
    res.status(httpStatus.UNAUTHORIZED).send();
  }
};

module.exports = auth;