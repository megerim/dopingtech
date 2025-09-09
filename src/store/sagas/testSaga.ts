import {
  call,
  put,
  takeEvery,
  CallEffect,
  PutEffect,
} from 'redux-saga/effects';
import {
  loadTestFailure,
  loadTestSuccess,
  Question,
} from '../slices/testSlice';

function fetchQuestionsApi(): Promise<Question[]> {
  return fetch('/data/questions.json').then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  });
}

function* loadTestWorker(): Generator<
  CallEffect<Question[]> | PutEffect,
  void,
  Question[]
> {
  try {
    const questions: Question[] = yield call(fetchQuestionsApi);
    yield put(loadTestSuccess(questions));
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : 'Failed to load questions';
    yield put(loadTestFailure(errorMessage));
  }
}

export function* testSaga() {
  yield takeEvery('test/loadTestStart', loadTestWorker);
}
