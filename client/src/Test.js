import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { pathToFileURL } from "url";




function Test() {

    const navigate = useNavigate();

  const [time, setTime] = useState(new Date());
        useEffect(() => {
            setInterval(() => {
            setTime(new Date());
            }, 1000);
        }, []);











    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Navbar</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarColor03">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item">
                        <a class="nav-link active" href="#">Home</a>    
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="#">Post</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="#">Calendar</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="#">Mypage</a>
                        </li>
                        <li/>
                        
                        <li class="nav-link">
                            <span>
                                {time.getMonth() + 1} / {time.getDate()} 일 {time.getHours()}시 {time.getMinutes()}분 {time.getSeconds()}초
                            </span>
                        </li>

                        
                    </ul>
                    <form class="d-flex">
                        <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    </div>
                </div>
            </nav>  
            


        </>



    );
}


export default Test;


