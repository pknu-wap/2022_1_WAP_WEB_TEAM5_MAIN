import React, { useState } from "react";
import "./Modal.css";

function Modal({ posts, closeModal, modalState }) {
  return (
    <div>
      {modalState ? (
        <div className="background">
          {posts.map((post) => (
            <div>
              {post.name}: {post.title}
            </div>
          ))}
          <button onClick={closeModal}>close</button>
        </div>
      ) : null}
    </div>
  );
}

export default Modal;
