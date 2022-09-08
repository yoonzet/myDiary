const mongoose = require("mongoose");

const guestBookSchema = mongoose.Schema({
  text: {
    type: String,
    maxLength: 100,
  },
});

const GuestBook = mongoose.model("GuestBook", guestBookSchema);

module.exports = { GuestBook };
