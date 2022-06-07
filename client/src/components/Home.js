import React from "react";
import PostList from "./Community/PostList";
import ActiveUser from "./Community/ActiveUser";
import "./Home.css";
import Main from "./Calendar/Main";

function Home() {
  return (
    <div className="home1">
      <div className="home2">
        <ActiveUser />
        <PostList />
      </div>
    </div>
  );
}

export default Home;
