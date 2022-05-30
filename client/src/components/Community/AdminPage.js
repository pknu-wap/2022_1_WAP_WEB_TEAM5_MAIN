import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminPage() {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await axios.get("/api/users/userlist").then((res) => {
          console.log(res.data.userList);
        setUserList(res.data.userList);
      });
    }
    fetchData();
  }, []);
  return(<div>
      {userList && userList.map((user) => <div>{console.log(user)}</div>)}
  </div>)
}

export default AdminPage;
