const express = require("express")
const puzzleRouter = express.Router();
const auth = require("../middleware/authHandler");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/User")
const Puzzle = require("../models/Puzzle")

puzzleRouter.get("/:userId", auth, catchAsync(async (req, res) => {
  const puzzles = await Puzzle.find({}).lean().exec();
  const user = await User.findById(req.params.userId)
  const solved = user.puzzles;
  for (let i = 0; i < puzzles.length; i++) {
    puzzles[i].solved = false;
  }
  for (let i = 0; i < puzzles.length; i++) {
    for (let j = 0; j < solved.length; j++) {
      if (puzzles[i]._id.equals(solved[j])) {
        puzzles[i].solved = true;
      }
    }
  }
  res.status(200).json({ puzzles: puzzles })
}))
puzzleRouter.get("/solve/:puzzleId", auth, catchAsync(async (req, res) => {
  console.log("WIN");
  const puzzle = await Puzzle.findById(req.params.puzzleId);
  const user = await User.findById(req.user._id);

  for (let i = 0; i < user.puzzles.length; i++) {
    if (puzzle._id.equals(user.puzzles[i]._id)) {
      return res.status(200).send();
    }
  }

  user.puzzles.push(puzzle);
  user.save()
  res.status(200).send();
}))

module.exports = puzzleRouter;