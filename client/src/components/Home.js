import React from "react";
import PostList from "./Community/PostList";
import ActiveUser from "./Community/ActiveUser";
import './Home.css';

function Home(){
    return(<div className="home">
        <ActiveUser />
        <PostList/>
    </div>)
}

export default Home;