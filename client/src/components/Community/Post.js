import React, { useState } from "react";
import "./Post.css";
import { Link } from "react-router-dom";

function Post({ id, name, category, title, textArea, date }) {
  //console.log(post);
  return (
    <div className="post">
      <span className="postCategory">{category}</span>
      <span className="postName">Name: {name}</span>
      <Link
        className="postTitle "
        to={{ pathname: `/post/${id}` }}
        state={{ id, name, category, title, textArea, date }}
      >
        Title: {title}
      </Link>
    </div>
  );
}

export default Post;
