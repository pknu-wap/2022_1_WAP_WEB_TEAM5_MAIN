import { LOGIN_USER, REGISTER_USER } from "../_actions/types";
import { createSlice } from "@reduxjs/toolkit";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case REGISTER_USER:
      console.log(action)
      return { ...state, registerSuccess: action.payload };
    default:
      return state;
  }
}
//action 함수가 서버로부터 받아온 데이터를 받아서 state 에 적용한다.