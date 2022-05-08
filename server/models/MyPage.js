const mongoose = require("mongoose");

const MyPageSchema = mongoose.Schema({
  name: {
    type: String,
    required:true,
  },
  gender:{
      type: String,
      required: true
  },
  age: {
    type: Number,
    required: true,
  },
  hobby:{
      type:String,
      required: true
  },
  textArea: {
    type: String,
    required: true,
  },
});

const MyPage = mongoose.model("MyPage", MyPageSchema);
module.exports = { MyPage };
