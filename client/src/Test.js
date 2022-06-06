import '../node_modules/./bootstrap.min.css'

import { Button, label,input } from 'react-bootstrap';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { pathToFileURL } from "url";




function Test() {

    return (
        <form>
            <label>
            <p className="label-txt">ENTER YOUR EMAIL</p>
                <input type="text" class="input"/>
            <div className="line-box">
                <div class="line"></div>
            </div>

            </label>
            <label>
            <p className="label-txt">ENTER YOUR NAME</p>
                <input type="text" class="input"/>
            <div className="line-box">
                <div className="line"></div>
            </div>
            </label>
            <label>
            <p className="label-txt">ENTER YOUR PASSWORD</p>
            <input type="text" class="input"/>
            <div className="line-box">
                <div className="line"></div>
            </div>
            </label>
            <button type="submit">submit</button>
        </form>




    );
}


export default Test;


