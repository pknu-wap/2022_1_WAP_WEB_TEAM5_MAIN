import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ActiveUser.css";
import { Link } from "react-router-dom";

function ActiveUser() {
  const [userList, setUserList] = useState([]);

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
  };
  return (
    <div className="userList">
      <div className="activeUserTitle">ActiveUser</div>
      <div>
        <button className="btn btn-primary" onClick={onReloadHandler}>RELOAD</button>
      </div>
      {userList &&
        userList.map((user) => (
          <div className="list-group-item d-flex justify-content-between align-items-center">
            <Link
              className="postName"
              to={{ pathname: `/mypage/${user.name}` }}
              state={{ name: user.name }}
            >
              {user.name}
            </Link>
          </div>
        ))}
    </div>
  );
}

export default ActiveUser;
