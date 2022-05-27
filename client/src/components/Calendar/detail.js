import React, { useState, useEffect } from "react";
import Modal from "./modal";

function Detail({ posts, date }) {
  const [modalState, setModalState] = useState(false);
  const openModal = () => {
    setModalState(true);
  };
  const closeModal = () => {
    setModalState(false);
    console.log(modalState);
  };

  console.log(posts);
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
