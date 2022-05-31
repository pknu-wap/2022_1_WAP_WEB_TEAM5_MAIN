import React, { useState } from "react";
import io from "socket.io-client";
import { useEffect } from "react";
import { render } from "react-dom";

//서버랑 연결
const socket = io.connect("http://localhost:5000");

function Chat() {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [chat, setChat] = useState([]);

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ));
  };

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = (e) => {
    console.log(`sendMesssage: ${name} ${message} ${room}`);
    socket.emit("send_message", { name, message, room });
    setMessage("");
  };

  useEffect(() => {
    //서버랑 연결해서 socket이 움직일때마다 "reveive_message" 케이스 경우를 받아옴
    socket.on("receive_message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
  });
  return (
    <div>
      <input
        placeholder="Room Number..."
        onChange={(e) => {
          setRoom(e.target.value);
        }}
      />
      <button onClick={joinRoom}>Join Room</button>
      <input
        placeholder="Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        value={message}
        placeholder="Message..."
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={sendMessage}>Send Message</button>
      {renderChat()}
    </div>
  );
}

export default Chat;
