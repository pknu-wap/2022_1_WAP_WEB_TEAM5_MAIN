import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const loginUser = createAsyncThunk(
  "users/login",
  async (dataToSubmit) => {
    console.log(dataToSubmit);
    const request = await axios
      .post("/api/users/login", dataToSubmit)
      .then((res) => res.data);

    return request;
  }
);

export const registerUser = createAsyncThunk(
  "users/register",
  async (dataToSubmit) => {
    const request = await axios
      .post("/api/users/register", dataToSubmit)
      .then((res) => res.data);

    return request;
  }
);
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {})
      .addCase(loginUser.fulfilled, (state, action) => {
        return action.payload.loginSuccess;
      })
      .addCase(loginUser.rejected, (state) => {});
    builder
      .addCase(registerUser.pending, (state) => {})
      .addCase(registerUser.fulfilled, (state, action) => {
        return action.payload.registerSuccess;
      })
      .addCase(registerUser.rejected, (state) => {});
  },
});

export default userSlice.reducer;
