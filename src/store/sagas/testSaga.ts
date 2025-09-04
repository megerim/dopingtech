import { call, put, takeEvery } from 'redux-saga/effects';
import { loadTestFailure, loadTestSuccess, Question } from '../slices/testSlice';

function fetchQuestionsApi(): Promise<{ questions: Question[] }> {
  return fetch('/data/questions.json').then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  });
}

function* loadTestWorker(): Generator<any, any, any> {
  try {
    const data: { questions: Question[] } = yield call(fetchQuestionsApi);
    yield put(loadTestSuccess(data.questions));
  } catch (err: any) {
    yield put(loadTestFailure(err?.message ?? 'Failed to load questions'));
  }
}

export function* testSaga() {
  yield takeEvery('test/loadTestStart', loadTestWorker);
}
