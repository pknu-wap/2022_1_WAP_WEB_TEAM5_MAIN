import { combineReducers } from "redux";
import user from "./userSlice.js";
import post from "./postSlice.js";

const rootReducer = combineReducers({
  user,
  post,
});

export default rootReducer;
