import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postPost } from "../../_actions/post_action";
import "./PostForm.css";

function Post() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTItle] = useState("");
  const [category, setCategory] = useState("etc");
  const [textArea, setTextArea] = useState("");

  const onTitleHandler = (e) => {
    e.preventDefault();
    setTItle(e.target.value);
  };

  const onCategoryHandler = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
  };
  const onTextAreaHandler = (e) => {
    e.preventDefault();
    setTextArea(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let body = {
      title,
      category,
      textArea,
    };
    dispatch(postPost(body)).then((res) => {
      console.log(res);
      if (res.payload.payload.postSuccess) {
        alert("게시글이 작성되었습니다.");
        navigate("/");
        window.location.reload();
      } else {
        alert("게시글 작성에 실패했습니다.");
      }
    });
  };

  return (
    <div>
      <form className="postForm" onSubmit={onSubmitHandler}>
        <label>Category</label>
        <select onChange={onCategoryHandler}>
          <option value="etc">Etc</option>
          <option value="work out">Work out</option>
          <option value="jogging">Jogging</option>
          <option value="study">Study</option>
        </select>
        <label>Title</label>
        <input type="text" onChange={onTitleHandler} />
        <label>TextArea</label>
        <textarea type="text" onChange={onTextAreaHandler} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Post;

/*
<form className="registerForm" onSubmit={onSubmitHandler}>
        <h1>Register</h1>
        <label>Gender</label>
        <select onChange={onGenderHandler}>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <label>Age</label>
        <input type="text" onChange={onAgeHandler} />
        <label>Name</label>
        <input type="text" onChange={onNameHandler} />
        <label>Email</label>
        <input type="text" onChange={onEmailHandler} />
        <label>Password</label>
        <input type="text" onChange={onPasswordHandler} />
        <label>Confirm Password</label>
        <input type="text" onChange={onConfirmPasswordHandler} />
        <button type="submit">Register</button>
      </form>
*/
