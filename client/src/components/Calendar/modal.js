import React, { useState } from "react";
import "./Modal.css";

function Modal({ posts, closeModal, modalState }) {
  return (
    <div>
      {modalState ? (
        <div className="background" >
          <button onClick={closeModal}>close</button>
          {posts.map((post)=><div>{post.name}: {post.title}</div>)}
        </div>
      ) : null}
    </div>
  );
}

export default Modal;
