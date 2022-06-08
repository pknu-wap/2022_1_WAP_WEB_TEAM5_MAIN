import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./MyPage.css";
import { Link } from "react-router-dom";
import { loginUser } from "../../_actions/user_action";

//순서
//db에 내 name의 mypage 정보 있으면 불러오고
//아니면 새로 만들라고 input란 만든다.

function MyPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [myPage, setMyPage] = useState([]);
  const [hobby, setHobby] = useState("");
  const [textArea, setTextArea] = useState("");
  const [loginUser, setLoginUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      // auth 의 name과 state.name 이 일치할때
      await axios.get("/api/users/auth").then((res) => {
        setLoginUser(res.data);
        console.log(res.data);
      });

      const request = await axios
        .get("/api/users/mypage")
        .then((res) => res.data.mypage);
      //마이페이지 작성 안됬으면 빈배열을 가져옴
      //마이페이지 작성 됬으면 배열의 첫번째 원소임

      await setMyPage(request);
    }
    fetchData();
  }, []);

  const onHobbyHandler = (e) => {
    e.preventDefault();
    setHobby(e.target.value);
  };
  const onTextAreaHandler = (e) => {
    e.preventDefault();
    setTextArea(e.target.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    let body = {
      hobby,
      textArea,
    };
    axios.post("/api/users/mypage", body).then((res) => {
      console.log(res);
      if (res.data.myPageSuccess) {
        alert("마이페이지가 작성되었습니다.");
        navigate("/");
        window.location.reload();
      } else {
        alert("마이페이지 작성에 실패했습니다.");
      }
    });
  };

  return (
    <div>
      {myPage.length ? (
        <div className="myPage">
          <div className="myPagePage">
            <label>Name</label>
            <div>{myPage[0].name}</div>
            <label>Age</label>
            <div>{myPage[0].age}</div>
            <label>Gender</label>
            <div>{myPage[0].gender}</div>
            <label>Hobby</label>
            <div>{myPage[0].hobby}</div>
            <label>Comment</label>
            <div>{myPage[0].textArea}</div>
            <button>
              <Link
                to="/mypage/modify"
                state={{
                  name: myPage[0].name,
                  age: myPage[0].age,
                  gender: myPage[0].gender,
                  hobby: myPage[0].hobby,
                  textArea: myPage[0].textArea,
                }}
              >
                MODIFY
              </Link>
            </button>
          </div>
        </div>
      ) : (
        
        <div className="myPage">
          <div className="myPagePage">
            <div>💙자기소개를 등록해주세요💙</div>
            <label>Name</label>
            <div className = "mypageLabel">{loginUser.name}</div>
            <label>Age</label>
            <div className = "mypageLabel">{loginUser.age}</div>
            <form className="infoForm" onSubmit={onSubmitHandler}>
              <h2>Hobby</h2>
              <input type="text" className="form-control" onChange={onHobbyHandler} />
              <h2>Comment</h2>
              <textarea type="text" className="form-control" onChange={onTextAreaHandler} />
              <button className="btn btn-primary" type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPage;
