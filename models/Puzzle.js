const mongoose = require("mongoose")

const PuzzleScheme = new mongoose.Schema({
  fen: { type: String },
  moves: [{ type: String }],
})

module.exports = mongoose.model("Puzzle", PuzzleScheme)