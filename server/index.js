const express = require("express");
const app = express();
const port = 5000;
const bodyparser = require("body-parser");
const db = require("./config/key");
const mongoose = require("mongoose");
const { User } = require("./models/User");
const { Post } = require("./models/Post");
const { auth } = require("./middleware/auth");
const cookieParser = require("cookie-parser");
const { Index } = require("./models/PostIndex");
//const userRouter = require("./routers/user");
const router = express.Router();
//app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cookieParser()); //요청된 쿠키를 쉽게 추출할 수 있도록 도와주는 미들웨어, express 의 req 객체에 cookies 속성이 부여된다.

app.post("/api/post/post", auth, (req, res) => {
  Index.find(
    ({},
    (err, array) => {
      let index = array[0].postId;
      let nextIndex = index + 1;
      console.log(nextIndex);

      const post = new Post({
        index: nextIndex,
        title: req.body.title,
        name: req.user.name,
        category: req.body.category,
        textArea: req.body.textArea,
      });

      console.log(post);
      post.save((err, postInfo) => {
        console.log(`저장된 postInfo => ${postInfo}`);
        if (err) {
          return res.json({ postSuccess: false, err });
        } else {
          Index.findOneAndUpdate(
            { postId: index },
            { postId: nextIndex },
            (err, info) => {
              if (err) {
                console.log(err);
              } else {
                console.log(info);
              }
            }
          );
          return res.status(200).json({ postSuccess: true });
        }
      });
    })
  );
});

app.get("/api/post/postlist", (req, res) => {
  Post.find({}, (err, postList) => {
    console.log(`Post.find postList => ${postList}`);
    if (!postList) {
      return res.json({
        postSuccess: false,
        message: "게시글을 불러올 수 없습니다.",
      });
    } else {
      let postListArray = postList;
      res.json({
        postList: postListArray,
        postSuccess: true,
      });
    }
  });
});

////User 관련 (로그인, 로그아웃, 회원가입, 권한확인)
app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);
  console.log(`새로 생성된 new User(req.body) = ${user}`);
  user.save((err, userInfo) => {
    console.log(`저장된 userInfo = ${userInfo}`);
    if (err) {
      return res.json({ registerSuccess: false, err });
    }
    return res.status(200).json({ registerSuccess: true });
  });
});

app.post("/api/users/login", (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email }, (err, user) => {
    console.log(user);
    //유저 없으면
    if (!user) {
      console.log("유저 없음");
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }

    //유저 있으면
    user.comparePassword(req.body.password, (err, isMatch) => {
      console.log(`password: ${req.body.password}, isMatch: ${isMatch}`);
      //비밀번호 일치 X
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      }

      //비밀번호 일치 O
      user.generateToken((err, user) => {
        //토큰 생성시 오류 발생 O
        if (err) return res.status(400).send(err);
        //오류 발생 X
        res
          .cookie("x_auth", user.token) //브라우저에 "x_auth" (key)로 user.token(value) 를 저장
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  //미들웨어(auth) 에서 로그인 상태임을 확인한 후
  //아래 코드 실행, 로그인 상태아니면 auth 에서 에러 발생
  console.log("/api/users/auth 에 접근 성공, 유저존재");
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true, //0이면 일반유저 이외엔 관리자
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  console.log("auth 통과");
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    console.log(`로그아웃 대상: ${user}`);
    return res.status(200).send({ logoutSuccess: true });
  });
});
////////////////////////////////////////////////

mongoose
  .connect(db.mongoURI, {
    useUnifiedTopology: true,
    autoIndex: true, //make this also true
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/*
app.get('/api/users/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role
    })
})
*/
