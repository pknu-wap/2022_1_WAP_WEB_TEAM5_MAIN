import { POST_POST,COMMENT_POST } from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case POST_POST:
      return { ...state, postSuccess: action.payload };
    case COMMENT_POST:
      console.log(action)
      return { ...state, commentSuccess: action.payload };
    default:
      return state;
  }
}
//action 함수가 서버로부터 받아온 데이터를 받아서 state 에 적용한다.