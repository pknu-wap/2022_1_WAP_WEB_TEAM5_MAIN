import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "./Post";
import "./PostList.css";

function PostList() {
  const [PostList, setPostList] = useState([]);
  const [category, setCategory] = useState("etc");

  const onCategoryHandler = async (e) => {
    e.preventDefault();
    let category = e.target.value;

    const request = await axios
      .post("/api/post/category", { category: category })
      .then((res) => res.data.postList);

    await setPostList(request);
  };

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
    <div className="postPage">
      <div className="listTitle">POSTLIST</div>
      <select className="category" onChange={onCategoryHandler}>
        <option value="all">All</option>
        <option value="work out">Work out</option>
        <option value="jogging">Jogging</option>
        <option value="study">Study</option>
        <option value="etc">Etc</option>
      </select>
      <div className="postList">
        {PostList &&
          PostList.map((post, index) => (
            <Post
              key={index}
              id={post.index}
              title={post.title}
              textArea={post.textArea}
              name={post.name}
              category={post.category}
              date={post.date}
            ></Post>
          ))}
      </div>
    </div>
  );
}
export default PostList;
