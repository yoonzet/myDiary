const mongoose = require("mongoose");
const { Schema } = mongoose;

const dDaySchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User", // User Schema의 아이디
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  dDAy: {
    type: String,
    required: true,
  },
});

const Dday = mongoose.model("Dday", dDaySchema);

module.exports = { Dday };
