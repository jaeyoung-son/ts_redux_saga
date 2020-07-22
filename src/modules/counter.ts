import { createAction, ActionType, createReducer } from "typesafe-actions";

// 액션 타입
const INCREASE = "counter/INCREASE" as const;
const DECREASE = "counter/DECREASE" as const;
const INCREASE_BY = "counter/INCREASE_BY" as const;

// 액션 생성함수
export const increase = createAction(INCREASE)();
export const decrease = createAction(DECREASE)();
export const increaseBy = createAction(INCREASE_BY)<number>();

//액션 겍체들에 대한 타입
const actions = { increase, decrease, increaseBy }; // 모든 액션 생성함수들을 actions 객체에 넣는다
type CounterAction = ActionType<typeof actions>; // ActionType 를 사용하여 모든 액션 객체들의 타입을 준비해준다

// 모듈에서 관리 할 상태의 타입
type CounterState = {
  count: number;
};

const initialState: CounterState = {
  count: 0,
};

// 리듀서
function counter(
  state: CounterState = initialState,
  action: CounterAction
): CounterState {
  switch (action.type) {
    case INCREASE: // case 라고 입력하고 Ctrl + Space 를 누르면 어떤 종류의 action.type들이 있는지 확인
      return { count: state.count + 1 };
    case DECREASE:
      return { count: state.count - 1 };
    case INCREASE_BY:
      return { count: state.count + action.payload };
    default:
      return state;
  }
}

export default counter;
