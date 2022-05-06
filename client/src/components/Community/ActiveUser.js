import React, { useEffect, useState } from "react";
import axios from "axios";
import './ActiveUser.css';

function ActiveUser(){
    const [userList, setUserList] = useState([])

    useEffect(() => {
        async function fetchData() {
          // You can await here
          const request = await axios
            .get("/api/users/userlist")
            .then((res) => res.data.activeUserList);
    
          await setUserList(request);
        }
        fetchData();
      }, []);

      const onReloadHandler = (e) => {
          e.preventDefault();
          window.location.reload();
      }
      return (<div className="userList">
          <div className="activeUserTitle">ActiveUser</div>
          <div><button onClick={onReloadHandler}>RELOAD</button></div>
          {userList.length && userList.map((user) => <div className="user">{user.name}</div>)}
      </div>)

}

export default ActiveUser;