import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { pathToFileURL } from "url";
import "./Navigation.css";

function Navigation({ isAuth, isAdmin }) {
  const navigate = useNavigate();

  const [time, setTime] = useState(new Date());
  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);

  const onLogoutHandler = async (e) => {
    e.preventDefault();

    axios.get("/api/users/logout").then((res) => {
      if (res.data.logoutSuccess) {
        alert("로그아웃 되었습니다.");
        navigate("/");
        window.location.reload();
      } else {
        alert("로그인 상태가 아닙니다.");
      }
    });
  };

  if (isAuth) {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div className="navigation">
            <Link to="/">Home</Link>

            <Link to="/post" state={{}}>Post</Link>

            <Link to="/">Calender</Link>

            <Link to="/mypage">MyPage</Link>

            <a href="/api/users/logout" onClick={onLogoutHandler}>
              Logout
            </a>

            {isAdmin && <Link to="/adminPage">AdminPage</Link>}
            <span className = "timeBar">
              {time.getMonth() + 1} / {time.getDate()} 일 {time.getHours()}시 {time.getMinutes()}분 {time.getSeconds()}초
            </span>

          </div>
      </nav>
    
    
    );
  }
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div className="navigation">
        <Link to="/">Home</Link>

        <Link to="/post" state={{}}>Post</Link>

        <Link to="/">Calender</Link>

        <Link to="/login">Login</Link>

        <Link to="/signup">SignUp</Link>
        <span className = "timeBar">
            {time.getMonth() + 1} / {time.getDate()} 일 {time.getHours()}시 {time.getMinutes()}분 {time.getSeconds()}초
        </span>
      </div>
    </nav>
  );
}

export default Navigation;
