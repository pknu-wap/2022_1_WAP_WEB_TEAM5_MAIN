//리듀서 같은것
import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",//required option
  initialState: {
    count: 0,
  },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, action) => {
      state.count += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;//액션함수?

export default counterSlice.reducer;//리듀서?