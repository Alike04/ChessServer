const express = require("express")
const errorHandler = require("./middleware/errorHandler")
const userRouter = require("./routes/UserRouter")
const puzzleRouter = require("./routes/PuzzleRouter")
const mongoose = require("mongoose")

const app = express();

app.use(express.json())

app.use("/api/user", userRouter)
app.use("/api/puzzle", puzzleRouter)


app.use(errorHandler)
mongoose.connect("mongodb://localhost:27017/chess").then(() => {
  app.listen(8080, () => {
    console.log("Server is running on port 8080");
  })
})