import axios from "axios";
import { POST_POST,COMMENT_POST } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const postPost = createAsyncThunk(
  "post/post",
  async (dataToSubmit) => {
    const request = await axios
      .post("/api/post/post", dataToSubmit)
      .then((res) => res.data);

      return {
        type: POST_POST,
        payload: request
      }
  }
);

export const commentPost = createAsyncThunk(
  "post/comment",
  async (dataToSubmit) => {
    const request = await axios
      .post("/api/post/comment", dataToSubmit)
      .then((res) => res.data);

    return {
      //action
      type: COMMENT_POST,
      payload: request //true or false
    };
  }
);