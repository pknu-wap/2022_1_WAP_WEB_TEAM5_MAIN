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
const { Comment } = require("./models/Comment");
const { MyPage } = require("./models/MyPage");
//const userRouter = require("./routers/user");
const router = express.Router();
//app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cookieParser()); //요청된 쿠키를 쉽게 추출할 수 있도록 도와주는 미들웨어, express 의 req 객체에 cookies 속성이 부여된다.

app.post("/api/users/mypage/modify", auth, (req, res) => {
  //mypage 수정과 동시에 user 도 수정해야함
  MyPage.findOneAndUpdate(
    { name: req.user.name },
    {
      age: req.body.age,
      hobby: req.body.hobby,
      textArea: req.body.textArea,
    },
    (err, mypage) => {
      if (err) {
        return res.json({
          message: "마이페이지를 수정 과정에서 문제가 발생했습니다.",
          myPageModiSuccess: false,
        });
      } else {
        User.findOneAndUpdate(
          { name: req.user.name },
          { age: req.body.age },
          (err, userInfo) => {
            if (err) {
              console.log(`mypage 정보 수정 중 에러발생`);
            } else {
              console.log(`mypage 정보 수정 완료 userInfo => ${userInfo}`);
            }
          }
        );
        console.log(`mypage 수정 완료  mypage => ${mypage}`);
        return res.json({
          myPageModiSuccess: true,
          mypage: mypage,
        });
      }
    }
  );
});

app.post("/api/users/mypage/otherpage", (req, res) => {
  MyPage.find({ name: req.body.name }, (err, otherpage) => {
    if (err) {
      return res.json({
        message: "상대방의페이지를 불러오는 과정에서 문제가 발생했습니다.",
      });
    } else {
      console.log(`otherpage 찾음 => ${otherpage}`);
      return res.json({
        otherpage: otherpage,
      });
    }
  });
});

app.get("/api/users/mypage", auth, (req, res) => {
  MyPage.find({ name: req.user.name }, (err, mypage) => {
    if (err) {
      return res.json({
        message: "마이페이지를 불러오는 과정에서 문제가 발생했습니다.",
      });
    } else {
      console.log(`mypage 찾음 => ${mypage}`);
      return res.json({
        mypage: mypage,
      });
    }
  });
});

app.post("/api/users/mypage", auth, (req, res) => {
  const myPageInfo = new MyPage({
    name: req.user.name,
    age: req.user.age,
    gender: req.user.gender,
    hobby: req.body.hobby,
    textArea: req.body.textArea,
  });
  console.log(myPageInfo);
  myPageInfo.save((err, myPageInfo) => {
    if (err) {
      return res.json({ myPageSuccess: false, err });
    } else {
      console.log(`myPageInfo => ${myPageInfo}`);
      return res.status(200).json({ myPageSuccess: true });
    }
  });
});
////////////////////////////////////////
app.get("/api/users/userlist", (req, res) => {
  let userList = [];
  User.find({}, (err, userList) => {
    if (err) {
      return res.json({
        message: "유저리스트를 불러오는 과정에서 문제가 발생했습니다.",
      });
    }
    userList = userList.filter((value) => value.token.length > 0);
    return res.json({
      activeUserList: userList,
    });
  });
});

//////////////////////////////////////////////////
app.post("/api/post/comment", auth, (req, res) => {
  console.log(req.body);

  const comment = new Comment({
    index: req.body.id,
    name: req.user.name,
    comment: req.body.comment,
  });

  comment.save((err, commentInfo) => {
    if (err) {
      return res.json({ commentSuccess: false, err });
    } else {
      console.log(`comment saved, commentInfo => ${commentInfo}`);
      return res.status(200).json({ commentSuccess: true });
    }
  });
});

app.post("/api/post/commentlist", (req, res) => {
  //console.log(req.body.id);
  Comment.find({ index: req.body.id }, (err, commentList) => {
    console.log(`Comment.find commentList => ${commentList}`);
    if (!commentList) {
      return res.json({
        message: "댓글을 불러올 수 없습니다.",
      });
    } else {
      let commentListArray = commentList;
      res.json({
        commentList: commentListArray,
      });
    }
  });
});
////////////////////////////////////////////////////////
app.post("/api/post/delete", (req, res) => {
  //게시글에서 isMyPage 로 권한 확인했음
  Post.findOneAndDelete({ index: req.body.id }, (err, postInfo) => {
    if (err) {
      return res.json({ postDeleteSuccess: false });
    }
    //해당 게시글의 댓글도 삭제한다
    Comment.findOneAndDelete({id: req.body.id}, (err, commentList)=> {
      if(err){return res.json({message: "해당 게시글의 댓글을 작성하는 과정에서 에러가 발생했습니다."})}
    })
    //댓글도 정상적으로 삭제가 됐을때
    return res.json({ postDeleteSuccess: true });
  });
});

app.post("/api/post/modify", (req, res) => {
  //이미 modi 페이지로 들어올때 권한 확인했음
  Post.findOneAndUpdate(
    { index: req.body.id, name: req.body.name },
    {
      title: req.body.title,
      textArea: req.body.textArea,
      modifiedDate: Date.now(),
    },
    (err, postInfo) => {
      if (err) {
        return res.json({ postDetailModiSuccess: false });
      }
      return res.json({ postDetailModiSuccess: true });
    }
  );
});

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

app.post("/api/post/category", (req, res) => {
  if (req.body.category == "all") {
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
        });
      }
    });
  } else {
    Post.find({ category: req.body.category }, (err, postList) => {
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
        });
      }
    });
  }
});
////////////////////////////////////////////////////////////
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
    age: req.user.age,
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
///////////////////////////////////////////////////////////////
/*
app.get('/api/users/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role
    })
})
*/
