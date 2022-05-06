import React, { useState } from "react";
import "./Login.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../../_actions/user_action.js";
import { useNavigate } from "react-router-dom";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const onEmailHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const onPasswordHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  const onSumitHandler = (e) => {
    e.preventDefault();
    let body = {
      email,
      password,
    };
    dispatch(loginUser(body)).then((res) => {
      console.log(res);
      if (res.payload.payload.loginSuccess) {
        alert("로그인에 성공하였습니다.")
        navigate("/");
        window.location.reload();
      } else {
        alert("로그인에 실패했습니다.");
      }
    });
  };

  return (
    <div>
      <form onSubmit={onSumitHandler} className="loginForm">
        <h1>Login</h1>
        <label>Email</label>
        <input type="text" onChange={onEmailHandler} />
        <label>Password</label>
        <input type="text" onChange={onPasswordHandler} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
