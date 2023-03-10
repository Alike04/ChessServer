const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  name: { type: String, require: true },
  gmail: { type: String, require: true },
  password: { type: String, require: true },
  puzzles: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Puzzle" }]
})

UserSchema.statics.isEmailTaken = async function (email) {
  const user = await this.findOne({ email: email });
  return user;
};

module.exports = mongoose.model("User", UserSchema)