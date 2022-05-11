import logo from "./logo.svg";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Navigation/Register";
import Login from "./components/Navigation/Login";
import Counter from "./components/Navigation/Counter";
import axios from "axios";
import { useState } from "react";
import PostForm from "./components/Community/PostForm";
import Home from "./components/Home";
import Detail from "./components/Community/PostDetail";
import MyPage from "./components/Community/MyPage"; 
import MyPageModi from "./components/Community/MyPageModi";
import OtherPage from "./components/Community/OtherPage";
import PostDetailModi from "./components/Community/PostDetailModi";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  axios
    .get("/api/users/auth")
    .then((res) => {
      if (res.data.isAuth) {
        setIsAuth(true);
        console.log("isAuth is true")
      }else{console.log("isAuth is false")}
    })


  return (
    <div className="App">
      <Navigation isAuth={isAuth} />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" />
        <Route path="/signup" element={<Register />} />
        <Route path="/post" element={<PostForm />} />
        <Route path="/post/:id" element={<Detail/>}/>
        <Route path="/post/modify" element={<PostDetailModi/>}/>
        <Route path="/mypage" element={<MyPage/>}/>
        <Route path="/mypage/:name"  element={<OtherPage/>}/>
        <Route path="/mypage/modify" element={<MyPageModi/>}/>
      </Routes>
    </div>
  );
}

export default App;
