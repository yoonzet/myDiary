const mongoose = require("mongoose");
const { Schema } = mongoose;

const weeklySchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User", // User Schema의 아이디
  },
  content: {
    type: Object,
    required: true,
  },
});

const Weekly = mongoose.model("Weekly", weeklySchema);

module.exports = { Weekly };
