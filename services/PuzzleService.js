const Puzzle = require("../models/Puzzle")

const getAll = async () => {
  const puzzles = await Puzzle.find();
  return puzzles;
}
const getByUser = async (ids) => {
  const puzzles = await Puzzle.find().where("_id").in(ids).exec();
  return puzzles;
}

module.exports = { getAll, getByUser }