import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postPost } from "../../_actions/post_action";
import "./PostForm.css";

function Post() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [title, setTItle] = useState("");
  const [category, setCategory] = useState("etc");
  const [textArea, setTextArea] = useState("");
  const [file, setFile] = useState();

  const onFileHandler = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
  };
  const onTitleHandler = (e) => {
    setTItle(e.target.value);
  };

  const onCategoryHandler = (e) => {
    setCategory(e.target.value);
  };
  const onTextAreaHandler = (e) => {
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
  useEffect(() => {
    axios.get("/api/users/auth").then((res) => {
      if (res.data.isAdmin) {
        setIsAdmin(true);
      }
    });
  });
  return (
    <div className="postFormPage">
      <form className="postForm" onSubmit={onSubmitHandler}>
        <h3>POST</h3>
        <div className="mb-3">
          <div>
            <label>Category</label>
          </div>

          <select onChange={onCategoryHandler}>
            {isAdmin && <option value="notice">Notice</option>}
            <option value="work out">Work out</option>
            <option value="jogging">Jogging</option>
            <option value="study">Study</option>
          </select>
        </div>

        <div className="mb-3">
          <div>
            <label>Title</label>
          </div>
          <input type="text" onChange={onTitleHandler} />
        </div>

        <div className="mb-3">
          <div>
            <label>TextArea</label>
          </div>

          <textarea type="text" onChange={onTextAreaHandler} />
        </div>
        <div className="d-grid">
          <button type="btn btn-primary">Submit</button>
        </div>
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
