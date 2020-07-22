import { combineReducers } from "redux";
import counter from "./counter";
import todos from "./todos";
import github from "./github";
import { githubSaga } from "./github";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
  counter,
  todos,
  github,
});

export default rootReducer;

// 루트 리듀서의 반환 타입 잡기
export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield all([githubSaga()]);
}
