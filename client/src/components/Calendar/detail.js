import React, { useState, useEffect } from "react";
import Modal from "./modal";

function Detail({ posts, date }) {
  const [modalState, setModalState] = useState(false);
  const openModal = () => {
    if(posts.length){
    setModalState(true);
    }else{
      alert("등록된 일정이 없습니다.")
    }
  };
  const closeModal = () => {
    setModalState(false);
    console.log(modalState);
  };

  return (
    <div >
      <div className="datedate" onClick={openModal}>{date}</div>
      {posts.map((post) => {
        return (
          <div>
            {post.name}
          </div>
        );
      })}
      <Modal posts={posts} closeModal={closeModal} modalState={modalState} />
    </div>
  );
}

export default Detail;
