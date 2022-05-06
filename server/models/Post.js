const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const uniqueValidator = require("mongoose-unique-validator");
//https://my-codinglog.tistory.com/13 에러 메시지
//https://www.npmjs.com/package/mongoose-unique-validator unique 속성 적용

const postSchema = mongoose.Schema({
  index: {
    type: Number,
    required:true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: "Work out",
  },
  title: {
    type: String,
    required: true,
  },
  textArea: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: () => Date.now(),
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = { Post };
