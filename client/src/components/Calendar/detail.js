import React, { useState, useEffect } from "react";

function Detail({ posts, date }) {
    console.log(posts)
  return (
    <div>
    <div>{date}</div>
      {posts.map((post) => {return <div>{post.name}: {post.title}</div>})}
    </div>
  );
}

export default Detail;
