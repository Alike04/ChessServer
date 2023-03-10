const User = require("../models/User")

const createUser = async (body) => {
  const user = await User.create(body);
  return user;
}
const getUserById = async (id) => {
  const user = User.findById(id)
  return user;
}
const getUserByEmail = async (email) => {
  const user = User.find({ email: email });
  return user;
}
const updateUser = async (puzzleId, userId) => {
  const user = await User.findById(userId);
  let newUser = user;
  newUser.puzzles.push(puzzleId)
  Object.assign(user, newUser);
  user.save();
  return user;
}

module.exports = { createUser, updateUser, getUserByEmail, getUserById };