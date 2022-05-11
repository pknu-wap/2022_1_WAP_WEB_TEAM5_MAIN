import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PostDetailModi.css";
import axios from "axios";

function PostDetailModi() {
  const location = useLocation();
  const state = location.state;
  console.log(state);
  const navigate = useNavigate();

  //수정할것 제목&내용
  const [title, setTitle] = useState(state.title);
  const [textArea, setTextArea] = useState(state.textArea);

  const onTitleHandler = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };
  const onTextAreaHandler = (e) => {
    e.preventDefault();
    setTextArea(e.target.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    let body = {
      id: state.id,
      name: state.name,
      title,
      textArea,
    };

    axios.post("/api/post/modify", body).then((res) => {
      console.log(res);
      if (res.data.postDetailModiSuccess) {
        alert("게시글이 수정되었습니다.");
        navigate("/");
        //navigate(`/post/${state.id}`);
        window.location.reload();
      } else {
        alert(
          "게시글 수정에 실패했습니다. 값이 올바르게 입력됬는지 확인하세요."
        );
      }
    });
  };
  return (
    <div className="postDetail">
      <div className="postInfo">
        <form onSubmit={onSubmitHandler}>
          <h1>title</h1>
          <input type="text" value={title} onChange={onTitleHandler} />
          <h1>comment</h1>
          <textarea type="text" value={textArea} onChange={onTextAreaHandler} />
          <div>최초 작성시간 Date: {state.date}</div>
          {state.date !== state.modiDate && (
            <div>마지막 수정한 날짜: {state.modiDate}</div>
          )}
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </div>
  );
}

export default PostDetailModi;
