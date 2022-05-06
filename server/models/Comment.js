const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
//https://my-codinglog.tistory.com/13 에러 메시지
//https://www.npmjs.com/package/mongoose-unique-validator unique 속성 적용

const commentSchema = mongoose.Schema({
  index: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: () => Date.now(),
  },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = { Comment };
