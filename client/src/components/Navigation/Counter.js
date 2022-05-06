import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, incrementByAmount } from "../features/counter_reducer"

const Counter = () => {
  const { count } = useSelector((state) => state.counter);//counter 리듀서의 state 의 count 값
  const dispatch = useDispatch();

  return (
    <div>
      <h1>The Count is : {count}</h1>
      <button onClick={() => dispatch(increment())}>INCREMENT</button>
      <button onClick={() => dispatch(decrement())}>DECREMENT</button>
      <button onClick={() => dispatch(incrementByAmount(33))}>
        Increment by 33
      </button>
    </div>
  );
};

export default Counter;