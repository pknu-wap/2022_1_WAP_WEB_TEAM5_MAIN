import React from "react";
import PostList from "./Community/PostList";
import ActiveUser from "./Community/ActiveUser";
import "./Home.css";
import Main from "./Calendar/Main";

function Home() {
  return (
    <div>
      <div className="home">
        <ActiveUser />
        <PostList />
      </div>
      <Main />
    </div>
  );
}

export default Home;
