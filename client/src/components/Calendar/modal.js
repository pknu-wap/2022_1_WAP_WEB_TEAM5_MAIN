import React, { useState } from "react";
import "./Modal.css";

function Modal({ posts, closeModal, modalState }) {
  return (
    <div>
      {modalState ? (
        <div className="background">
          {posts.map((post) => (
            <div>
              [{post.name}] {post.title}, {post.textArea} ({post.startDate.hour}:{post.startDate.min})
            </div>
          ))}
          <button onClick={closeModal}>close</button>
        </div>
      ) : null}
    </div>
  );
}

export default Modal;
