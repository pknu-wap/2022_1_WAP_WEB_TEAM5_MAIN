const nodemailer = require('nodemailer');
module.exports = async (req, res, next) => {
  const {  name, email, num } = req.body; // 보낼 이메일 주소, 이메일 제목, 이메일 본문, 받는 사람 이름
  try {
  // 전송하기
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com', // gmail server 사용
      port: 587,
      secure: false,
      auth: {
        user: "bomul0524@pukyong.ac.kr", // 보내는 사람의 구글계정 메일 
        pass: "qnrudqlqjsehdgus@", // 보내는 사람의 구글계정 비밀번호 (또는 생성한 앱 비밀번호)
      },
    });
    
    // 보낼 메세지
    let message = {
      from: "bomul0524@pukyong.ac.kr", // 보내는 사람
      to: `닉네임<${email}>`, // 받는 사람 이름과 이메일 주소
      subject: "(WEB TEAM 5) 부경대학교 학생 인증 메일입니다.", // 메일 제목
      html: `<div
      style="
      text-align: center; 
      width: 50%; 
      height: 60%;
      margin: 15%;
      padding: 20px;
      box-shadow: 1px 1px 3px 0px #999;
      ">
      <h2>부경대학교 학생 인증 메일</h2> <br/> <h2>${name} 님, 안녕하세요.</h2> <br/>${num}<br/><br/>인증바랍니다 :)<br/><br/></div>`,
    };
    
    // 메일이 보내진 후의 콜백 함수
    transporter.sendMail(message, (err) => {
      if (err) next(err);
      else res.status(200).json({ isMailSucssessed: true});
    });
  } catch (err) {
    next(err);
  }
};