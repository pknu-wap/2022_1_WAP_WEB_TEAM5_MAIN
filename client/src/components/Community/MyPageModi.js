import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./MyPageModi.css";
import axios from "axios";

function MyPageModi() {
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();

  const [age, setAge] = useState(state.age);
  const [name, setName] = useState(state.name);
  const [gender, setGender] = useState(state.gender);
  const [hobby, setHobby] = useState(state.hobby);
  const [textArea, setTextArea] = useState(state.textArea);

  const onAgeHandler = (e) => {
    e.preventDefault();
    setAge(e.target.value);
    console.log(age);
  };
  /*
  const onNameHandler = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const onGenderHandler = (e) => {
    e.preventDefault();
    setGender(e.target.value);
  };
  */
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
      age,
      //name,
      //gender,
      hobby,
      textArea,
    };
    axios.post("/api/users/mypage/modify", body).then((res) => {
      console.log(res);
      if (res.data.myPageModiSuccess) {
        alert("마이페이지가 수정되었습니다.");
        navigate("/mypage");
        window.location.reload();
      } else {
        alert(
          "마이페이지 수정에 실패했습니다. 값이 올바르게 입력됬는지 확인하세요."
        );
      }
    });
  };
  return (
    <div className="myPage">
      <form className="myPagePage" onSubmit={onSubmitHandler}>
        <h1>MyPage</h1>
        <label>Name</label>
        <div>{name}</div>
        <label>Gender</label>
        <div>{gender}</div>
        <label>Age</label>
        <input type="text" value={age} onChange={onAgeHandler} />
        <label>Hobby</label>
        <input type="text" value={hobby} onChange={onHobbyHandler} />
        <label>Comment</label>
        <textarea type="text" value={textArea} onChange={onTextAreaHandler} />
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
}

export default MyPageModi;
/* 
<label>Name</label>
<input type="text" value={name} onChange={onNameHandler} />
<label>Gender</label>
<select onChange={onGenderHandler}>
    <option value="male">male</option>
    <option value="female">female</option>
</select>
*/
