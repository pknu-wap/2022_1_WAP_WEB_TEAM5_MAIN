const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const chatSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  room:{
      type:String,
      required: true
  },
  date: {
    type: Date,
    default: () => Date.now(),
  },
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = { Chat };
