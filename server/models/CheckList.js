const mongoose = require("mongoose");
const { Schema } = mongoose;

const checkListSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User", // User Schema의 아이디
  },
  content: {
    type: Object,
    required: true,
  },
  checked: {
    type: Boolean,
    required: true,

    // default: false,
  },
});

const CheckList = mongoose.model("CheckList", checkListSchema);

module.exports = { CheckList };
