import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./OtherPage.css";
import { Link } from "react-router-dom";

//순서
//db에 내 name의 mypage 정보 있으면 불러오고
//아니면 새로 만들라고 input란 만든다.

function OtherPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const name = state.name;

  const [otherPage, setOtherPage] = useState([]);
  const [hobby, setHobby] = useState("");
  const [textArea, setTextArea] = useState("");
  const [isOwnPage, setIsOwnPage] = useState(false);
  const [hostUser, setHostUser] = useState({});
  const [guestUser, setGuestUser] = useState({});
  const [loginUser, setLoginUser] = useState(false);

  useEffect(() => {
    async function fetchData() {
      // auth 의 name과 state.name 이 일치할때
      await axios.get("/api/users/auth").then((res) => {
        setGuestUser(res.data);
        if (res.data.name == name) {
          setIsOwnPage(true);
          setHostUser(res.data);
          console.log(res.data);
        }
        if (res.data.name) {
          setLoginUser(true);
        }
      });

      const request = await axios
        .post("/api/users/mypage/otherpage", { name })
        .then((res) => res.data.otherpage);
      //마이페이지 작성 안됬으면 빈배열을 가져옴
      //마이페이지 작성 됬으면 배열의 첫번째 원소임

      await setOtherPage(request);
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
      {otherPage.length ? (
        <div className="myPage">
          <div className="myPagePage">
            <label>Name</label>
            <div>{otherPage[0].name}</div>
            <label>Age</label>
            <div>{otherPage[0].age}</div>
            <label>Gender</label>
            <div>{otherPage[0].gender}</div>
            <label>Hobby</label>
            <div>{otherPage[0].hobby}</div>
            <label>Comment</label>
            <div>{otherPage[0].textArea}</div>
            {isOwnPage ? (
              <button>
                <Link
                  to="/mypage/modify"
                  state={{
                    name: otherPage[0].name,
                    age: otherPage[0].age,
                    gender: otherPage[0].gender,
                    hobby: otherPage[0].hobby,
                    textArea: otherPage[0].textArea,
                  }}
                >
                  MODIFY
                </Link>
              </button>
            ) : (
              <Link
                to="/chatpage"
                state={{ host: otherPage[0].name, guest: guestUser.name }}
              >
                채팅
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="myPage">
          {isOwnPage ? (
            <div className="myPagePage">
              <div>자기소개가 등록되지 않았습니다.</div>
              <label>Name</label>
              <div>{hostUser.name}</div>
              <label>Age</label>
              <div>{hostUser.age}</div>
              <form className="infoForm" onSubmit={onSubmitHandler}>
                <h2>Title</h2>
                <input type="text" onChange={onHobbyHandler} />
                <h2>TextArea</h2>
                <textarea type="text" onChange={onTextAreaHandler} />
                <button type="submit">Submit</button>
              </form>
            </div>
          ) : (
            <div>
              <div>아직 상대방의 자기소개가 등록되지 않았습니다.</div>
              {loginUser && (
                <Link
                  to="/chatpage"
                  state={{ host: name, guest: guestUser.name }}
                >
                  채팅
                </Link>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default OtherPage;
