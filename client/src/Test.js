import { Button, label,input } from 'react-bootstrap';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { pathToFileURL } from "url";




function Test() {
    return (
    <div>
        Hello
        <div className="userList">
            <div>ActiveUser</div>
        <div>
        <button>RELOAD</button>
        </div>
          <div><Link/></div>
        </div>
    </div>
    );
}


export default Test;


