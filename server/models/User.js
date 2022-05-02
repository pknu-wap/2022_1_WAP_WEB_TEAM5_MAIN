const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const uniqueValidator = require("mongoose-unique-validator");
//https://my-codinglog.tistory.com/13 에러 메시지
//https://www.npmjs.com/package/mongoose-unique-validator unique 속성 적용

const userSchema = mongoose.Schema({
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    maxlength: 15,
    required: true,
    unique: 1,
  },
  email: {
    type: String,
    trim: true, //공백 제거
    unique: 1, //이메일 중복 방지
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    required: true,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String
}
});
//userSchema.plugin(uniqueValidator);

userSchema.methods.comparePassword = function (plainPassword, cb) {
  //여기서 this 는 로그인시 email 로 db 에서 찾은 유저를 말함
  console.log(
    `plainPassword: ${plainPassword}, hashedPassword: ${this.password}`
  );

  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }

    console.log(`isMatch: ${isMatch}`);
    cb(null, isMatch); //isMatch => true or false
  });
};

userSchema.methods.generateToken = function (cb) {
  let user = this;
  let token = jwt.sign(user._id.toHexString(), "secretToken");

  user.token = token;
  //console.log(user);
  user.save((err, userInfo) => {
    //console.log(err);
    if (err) return cb(err);
    cb(null, userInfo);
  });
};

userSchema.statics.findByToken = function(token, cb){
  let user = this;//User
  //토큰 만들때 user._id + key => token 이므로
  // token 과 key 를 통해 "_id" 를 찾고 해당 _id 와 token 을 가지고 있는 객체를 찾는다.
  //근데 그냥 브라우저의 token 만 가지고 찾을 수 있지 않나?
  jwt.verify(token, 'secretToken', function(err,decoded){
    user.findOne({"_id": decoded, "token": token}, function(err, userInfo){
      if(err) return cb(err)
      console.log(`findOne userInfo=> ${userInfo}`)
      cb(null, userInfo)
    })
  })
}

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next(); //비밀번호 변경할 때만 암호화

    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash; // 원래 password는 plainpasword 였음

    return next();
  } catch (err) {
    return next(err);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
