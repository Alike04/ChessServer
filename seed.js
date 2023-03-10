const { default: mongoose } = require("mongoose")
const data = require("./Problems.json")
const Puzzle = require("./models/Puzzle")

mongoose.connect("mongodb://localhost:27017/chess")

const seedDB = async () => {
  await Puzzle.deleteMany({})
  await Puzzle.insertMany(data);
}

seedDB().then(() => {
  mongoose.connection.close();
})