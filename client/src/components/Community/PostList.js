import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import "./PostList.css";

function PostList() {
  const [PostList, setPostList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const request = await axios
        .get("/api/post/postlist")
        .then((res) => res.data.postList);

      await setPostList(request);
    }
    fetchData();
  }, []);

  return (
    <div className="postList">
      <span className="listTitle">POSTLIST</span>
      {PostList &&
        PostList.map((post, index) => <Post key={index} id={post.index} title={post.title} textArea={post.textArea} name={post.name} category={post.category} date={post.date}></Post>)}
    </div>
  );
}
export default PostList;
