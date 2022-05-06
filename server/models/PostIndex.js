const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
//https://my-codinglog.tistory.com/13 에러 메시지
//https://www.npmjs.com/package/mongoose-unique-validator unique 속성 적용

const indexSchema = mongoose.Schema({
  postId: {
      type: Number,
      default: 0,
  },
  totalPost: {
      type:Number,
      default: 0,
  }
});

const Index = mongoose.model("Index", indexSchema);
module.exports = { Index };
