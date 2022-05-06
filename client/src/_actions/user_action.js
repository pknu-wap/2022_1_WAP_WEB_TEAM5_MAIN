import axios from "axios";
import { LOGIN_USER, REGISTER_USER } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "users/login",
  async (dataToSubmit) => {
    const request = await axios
      .post("/api/users/login", dataToSubmit)
      .then((res) => res.data);

      return {
        type: LOGIN_USER,
        payload: request
      }
  }
);

export const registerUser = createAsyncThunk(
  "users/register",
  async (dataToSubmit) => {
    const request = await axios
      .post("/api/users/register", dataToSubmit)
      .then((res) => res.data);

    return {
      //action
      type: REGISTER_USER,
      payload: request //true or false
    };
  }
);

/*
export function loginUser(dataToSubmit) {
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then((res) => res.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}
*/


/*
export function registerUser(dataToSubmit) {
  const request = axios
    .post("/api/users/register", dataToSubmit)
    .then((res) => res.data);
  //res.data => { registerSuccess: true or false }
  console.log(`request => ${request}`);

  return {//action
    type: REGISTER_USER,
    payload: request, //true or false
  };
}
*/
