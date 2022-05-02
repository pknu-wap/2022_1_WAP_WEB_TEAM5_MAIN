const { User } = require("../models/User");

let auth = (req, res, next) => {
  //로그인 할때 token 을 cookie에 저장했었음
  let token = req.cookies.x_auth;
  //브라우저 cookie 에 저장된 토큰 가져옴

  User.findByToken(token, (err, user) => {
    //에러 발생
    if (err) throw err;;
    //isAuth: false 인 경우(토큰을 가진 객체가 db에 존재하지 않음)
    if (!user) {
      console.log("해당 토큰의 유저 db에 존재하지 않음");
      return res.json({ isAuth: false, error: true });
    }
    //isAuth: true 일 경우(토큰을 가진 객체가 db에 존재함)
    //console.log("해당 토큰의 유저 db에 존재함")
    req.token = token;
    req.user = user;

    next();
  });
};

module.exports = { auth };
