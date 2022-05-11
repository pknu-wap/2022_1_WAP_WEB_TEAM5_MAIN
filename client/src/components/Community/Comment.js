import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { commentPost } from "../../_actions/post_action";
import "./Comment.css";

function Comment({ id }) {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const request = await axios
        .post("/api/post/commentlist", { id: id })
        .then((res) => res.data.commentList);

      await setCommentList(request);
    }
    fetchData();
  }, []);

  //댓글 정상적으로 담겼는지 확인
  if (commentList) {
    //console.log(commentList);
  } else {
    //console.log("there are no commentList");
  }

  const dispatch = useDispatch();
  const onCommentHandler = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let body = {
      comment,
      id, //해당 게시글의 id(index)
    };
    dispatch(commentPost(body)).then((res) => {
      console.log(res);
      if (res.payload.payload.commentSuccess) {
        alert("댓글이 작성되었습니다.");
        window.location.reload();
      } else {
        alert("댓글 작성에 실패하였습니다. 로그인 상태를 확인하세요");
        setComment("");
        window.location.reload();
      }
    });
  };

  return (
    <div>
      <div className="commentList">
        {commentList.length &&
          commentList.map((comment, index) => (
            <div className="comment">
              <span className="commentName">Name: {comment.name}</span>
              <span className="commentContent">Comment: {comment.comment}</span>
            </div>
          ))}
      </div>
      <form onSubmit={onSubmitHandler} className="commentForm">
        <input type="text" onChange={onCommentHandler} />
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
}

export default Comment;
