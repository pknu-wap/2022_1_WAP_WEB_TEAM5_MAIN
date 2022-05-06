import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./PostDetail.css";
import Comment from "./Comment";

function Detail() {
  const location = useLocation();
  const state = location.state;

  return (
    <div className="postDetail">
      <div className="postInfo">
        <h1>{state.title}</h1>
        <div>Name: {state.name}</div>
        <div>Content: {state.textArea}</div>
        <div>Date: {state.date}</div>
      </div>
      <div className="commentTitle">Comment</div>
      <Comment id={state.id}/>
    </div>
  );
}

export default Detail;
