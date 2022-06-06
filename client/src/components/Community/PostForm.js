import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postPost } from "../../_actions/post_action";
import "./PostForm.css";

function Post() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin]= useState(0);
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
    console.log(category);
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
  useEffect(()=>{
    axios.get("/api/users/auth").then((res) => {
      if(res.data.isAdmin){
        setIsAdmin(1);
      }
    })
  })
  return (
    <div>
      <h3>POST</h3>
      <form className="postForm" onSubmit={onSubmitHandler}>
        <div className="mb-3">
          <label>Category</label><br/>
          <select className="form-control" onChange={onCategoryHandler}>
            {isAdmin && <option value="notice">Notice</option>}
            <option value="work out">Work out</option>
            <option value="jogging">Jogging</option>
            <option value="study">Study</option>
          </select>
        </div>


        <div className="mb-3">
          <label>Title</label><br/>
          <input type="text" className="form-control"  onChange={onTitleHandler} />
        </div>
      
      
        <div className="mb-3">
          <label>TextArea</label><br/>
          <textarea type="text" className="form-control" onChange={onTextAreaHandler} />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">Submit</button>
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
