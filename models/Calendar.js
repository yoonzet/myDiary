const mongoose = require("mongoose");
const { Schema } = mongoose;

const calendarSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User", // User Schema의 아이디
  },
  title: { type: String, required: true },
  description: { type: String },
  day: { type: Number },
});

const Calendar = mongoose.model("Calendar", calendarSchema);

module.exports = { Calendar };
