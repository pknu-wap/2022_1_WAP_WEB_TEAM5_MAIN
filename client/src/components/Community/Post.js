import React, { useState } from "react";
import "./Post.css";
import { Link } from "react-router-dom";

function Post({ id, name, category, title, textArea, date, modiDate }) {
  //console.log(post);
  return (
    <div className="post">
      <span className="postCategory">{category}</span>

      <Link
        className="postName"
        to={{ pathname: `/mypage/${name}` }}
        state={{ name }}
      >
        name: {name}
      </Link>
      <Link
        className="postTitle "
        to={{ pathname: `/post/${id}` }}
        state={{ id, name, category, title, textArea, date, modiDate }}
      >
        title: {title}
      </Link>
    </div>
  );
}

export default Post;
