import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./Register.css";
import { registerUser } from "../../_actions/user_action";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [age, setAge] = useState();
  const [name, setName] = useState();
  const [gender, setGender] = useState("male");
  const [email, setEmail] = useState();
  const [num, setNum] = useState();
  const [checkNum, setCheckNum] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const onAgeHandler = (e) => {
    e.preventDefault();
    setAge(e.target.value);
    console.log(age);
  };
  const onNameHandler = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };
  const onGenderHandler = (e) => {
    e.preventDefault();
    setGender(e.target.value);
  };
  const onEmailHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const onPasswordHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  const onConfirmPasswordHandler = (e) => {
    e.preventDefault();
    setConfirmPassword(e.target.value);
  };
  const onCheckHandler = (e) => {
    e.preventDefault();
    if (name == undefined || email == undefined) {
      alert("입력정보가 올바르지 않습니다.");
      return;
    } else {
      let str = email.slice(-13);
      if (str !== "pukyong.ac.kr") {
        alert("학교 이메일을 입력해야 합니다.");
        return;
      }
    }
    let numArray = new Uint16Array(1);
    window.crypto.getRandomValues(numArray);
    setCheckNum(numArray[0]);

    let body = {
      name,
      email,
      num: numArray[0],
    };

    axios.post("/api/users/register/email", body);
    alert("인증메일이 발송되었습니다. 메일을 확인해주세요.");
  };
  const onNumberdHandler = (e) => {
    e.preventDefault();
    setNum(e.target.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(checkNum);
    console.log(num);
    if (Number(num) !== Number(checkNum)) {
      alert("인증번호가 올바르지 않습니다.");
      return "인증번호 다름";
    }
    if (password !== confirmPassword) {
      alert("비밀번호가 다릅니다.");
      return "비밀번호 다름";
    } else {
      console.log("okay");
    }
    let body = {
      age,
      name,
      gender,
      email,
      password,
    };
    dispatch(registerUser(body)).then((res) => {
      // 여기서 res 는 action 함수가 반환하는 값
      // action 함수의 반환값이 여기로도 오고 reducer 함수로도 가는듯?
      console.log(res);
      if (res.payload.payload.registerSuccess) {
        alert("회원가입이 완료되었습니다 :)");
        navigate("/login");
      } else {
        alert(`유효한 값이 입력되지 않았습니다.     
        
ex) 이메일 또는 닉네임 중복, 비밀번호 최소 5자 이상, 닉네임 최대 15자`);
      }
    });
  };
  return (
    <div className="registerPage">
      <form className="registerForm" onSubmit={onSubmitHandler}>
        <h1>Register</h1>
        <div>회원가입 후 name 과 gender 는 수정이 불가합니다.</div>
        <label>Gender</label>
        <select onChange={onGenderHandler}>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <label>Age</label>
        <input type="text" onChange={onAgeHandler} />
        <label>Name</label>
        <input type="text" onChange={onNameHandler} />
        <label>Email</label>
        <input type="text" onChange={onEmailHandler} />
        <button onClick={onCheckHandler}>인증하기</button>
        <label>Number</label>
        <input type="text" onChange={onNumberdHandler} />
        <label>Password</label>
        <input type="text" onChange={onPasswordHandler} />
        <label>Confirm Password</label>
        <input type="text" onChange={onConfirmPasswordHandler} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
