const express = require("express")
const catchAsync = require("../utils/catchAsync")
const userRouter = express.Router()
const auth = require("../middleware/authHandler")
const { login, register } = require("../services/AuthService")
const { updateUser } = require("../services/UserService")


userRouter.post("/login", catchAsync(async (req, res) => {
  const token = await login(req.body.gmail, req.body.password)
  res.status(200).json(token)
}))

userRouter.post("/register", catchAsync(async (req, res) => {
  const token = await register(req.body);
  res.status(200).json(token)
}))
userRouter.post("/solve", auth, async (req, res) => {
  const user = updateUser(req.puzzleId, req.user._id);
  return user;
})

module.exports = userRouter
