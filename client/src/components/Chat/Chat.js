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
  console.log(state);
  const hostName = state.host;
  const guestName = state.guest;
  const [room, setRoom] = useState(hostName);
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
        {chatList.map(({ name, message }, index) => {if(name==guestName){return (
          <div className="chatRight" key={index}>
            <span className="chatRight2"><h4>
              {name}: <span>{message}</span>
            </h4></span>
            
          </div>
        )}else{
          return (
            <div className="chatLeft" key={index}>
              <span className="chatLeft2"><h4>
                {name}: <span>{message}</span>
              </h4></span>
              
            </div>
          )
        }})}
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
    console.log(`sendMesssage: ${guestName} ${message} ${room}`);
    socket.emit("send_message", { name: guestName, message, room });
    let body = { name: guestName, message, room };
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
    <div className="chatPage">
      <input
        value={room}
        onChange={(e) => {
          setRoom(e.target.value);
        }}
      />
      <button onClick={joinRoom}>Join Room</button>
      {renderChat()}
      <input value={guestName} />
      <input
        value={message}
        placeholder="Message..."
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={sendMessage}>SUBMIT</button>
    </div>
  );
}

export default Chat;
