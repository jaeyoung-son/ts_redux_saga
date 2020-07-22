import { call, put } from "redux-saga/effects";
import {
  AsyncActionCreatorBuilder,
  PayloadAction,
  action,
} from "typesafe-actions";

// 유틸함수의 재사용성을 높이기 위해 함수의 파라미터는 언제나 하나의 값을 사용,
// action.payload 를 그대로 파라미터러 넣어줌, 여러종류의 값을 파라미터로 넣어야 한다면 객체 형태로
type PromiseCreatorFunction<P, T> =
  | ((payload: P) => Promise<T>)
  | (() => Promise<T>);

// 액션이 페이로드를 갖고 있는지 확인
// __ is __ 문법은 type guard https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-type-assertions
function isPayloadAction<P>(action: any): action is PayloadAction<string, P> {
  return action.payload !== undefined;
}

export default function createAsyncSaga<T1, P1, T2, P2, T3, P3>(
  asyncActionCreator: AsyncActionCreatorBuilder<
    [T1, [any, any]],
    [T2, [any, any]],
    [T3, [any, any]]
  >,
  promiseCreator: PromiseCreatorFunction<P1, P2>
) {
  return function* saga(action: ReturnType<typeof asyncActionCreator.request>) {
    try {
      const result = isPayloadAction<P1>(action)
        ? yield call(promiseCreator, action.payload)
        : yield call(promiseCreator);
      yield put(asyncActionCreator.success(result));
    } catch (e) {
      yield put(asyncActionCreator.failure(e));
    }
  };
}
