import { testSaga } from './testSaga';

export function* rootSaga() {
  // For now we only have one saga. Keeping it super simple.
  yield* testSaga();
}
