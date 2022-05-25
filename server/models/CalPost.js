const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
//https://my-codinglog.tistory.com/13 에러 메시지
//https://www.npmjs.com/package/mongoose-unique-validator unique 속성 적용

const calPostSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Object,
    required: true,
  },
  category: {
    type: String,
    default: "etc",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  textArea: {
    type: String,
    required: true,
  },
});

const CalPost = mongoose.model("CalPost", calPostSchema);
module.exports = { CalPost };
