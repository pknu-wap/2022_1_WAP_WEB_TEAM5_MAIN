import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";

function Navigation({ isAuth }) {
  const navigate = useNavigate();

  const onLogoutHandler = async (e) => {
    e.preventDefault();

    axios.get("/api/users/logout").then((res) => {
      if (res.data.logoutSuccess) {
        alert("로그아웃 되었습니다.");
        navigate("/")
        window.location.reload();
      } else {
        alert("로그인 상태가 아닙니다.");
      }
    });
  };

  if (isAuth) {
    return (
      <div className="navigation">
        <Link to="/">Home</Link>
        <a href="/api/users/logout" onClick={onLogoutHandler}>
          Logout
        </a>
        <Link to="/post">Post</Link>
        <Link to="/mypage">MyPage</Link>
      </div>
    );
  }
  return (
    <div className="navigation">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">SignUp</Link>
    </div>
  );
}

export default Navigation;
