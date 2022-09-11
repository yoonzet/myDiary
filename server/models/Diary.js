const mongoose = require("mongoose");
const { Schema } = mongoose;

const diarySchema = mongoose.Schema({
  commenter: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User", // User Schema의 아이디
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
});

const Diary = mongoose.model("Diary", diarySchema);

module.exports = { Diary };
