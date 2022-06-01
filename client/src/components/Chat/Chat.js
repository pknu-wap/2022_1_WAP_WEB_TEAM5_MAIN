import React, { useState } from "react";
import io from "socket.io-client";
import { useEffect } from "react";
import { render } from "react-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Chat.css";

//서버랑 연결
const socket = io.connect("http://localhost:5000");

function Chat() {
  const location = useLocation();
  const state = location.state;
  const username = state.name;
  const [room, setRoom] = useState("");
  const [change, setChange] = useState(true);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [chat, setChat] = useState([]);
  const [chatList, setChatList] = useState([]);
  const [listState, setListState] = useState(true);

  const renderChat = () => {
    return (
      <div className="chatList">
        {chatList.map(({ name, message }, index) => (
          <div key={index}>
            <h3>
              {name}: <span>{message}</span>
            </h3>
          </div>
        ))}
      </div>
    );
  };

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
      alert(`${room}번 방에 입장했습니다.`);
      setChange(!change);
    }
  };

  const sendMessage = async (e) => {
    console.log(`sendMesssage: ${name} ${message} ${room}`);
    socket.emit("send_message", { name: username, message, room });
    let body = { name: username, message, room };
    await axios.post("/api/chat/post", body).then((res) => {
      if (!res.data.chatPostSuccess) {
        alert("대화 과정에서 문제가 발생했습니다.");
      }
    });
    setMessage("");
    setListState(!listState);
  };

  socket.on("receive_message", ({ name, message }) => {
    //setChat([...chat, { name, message }]);
  });
  useEffect(() => {
    async function fetchData() {
      // You can await here
      const request = await axios
        .post("/api/chat/postlist", { room })
        .then((res) => res.data.chatList);
      setChatList(request);
      console.log(chatList);
    }
    fetchData();
    //방 입장할때, 메시지 보낼때 다시 불러옴
  }, [change, listState]);

  return (
    <div>
      <input
        placeholder="Room Number..."
        onChange={(e) => {
          setRoom(e.target.value);
        }}
      />
      <button onClick={joinRoom}>Join Room</button>
      <input value={state.name} />
      <input
        value={message}
        placeholder="Message..."
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={sendMessage}>Send Message</button>{renderChat()}
    </div>
  );
}

export default Chat;
