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
  loadTestMeta,
  Question,
} from '../slices/testSlice';

interface QuestionsResponse {
  subject?: string;
  testTitle?: string;
  questions: Question[];
}

function fetchQuestionsApi(): Promise<QuestionsResponse> {
  return fetch('/data/questions.json').then((res) => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  });
}

function* loadTestWorker(): Generator<
  CallEffect<QuestionsResponse> | PutEffect,
  void,
  QuestionsResponse
> {
  try {
    const data: QuestionsResponse = yield call(fetchQuestionsApi);
    if (data.subject || data.testTitle) {
      yield put(
        loadTestMeta({ subject: data.subject, testTitle: data.testTitle }),
      );
    }
    yield put(loadTestSuccess(data.questions || []));
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : 'Failed to load questions';
    yield put(loadTestFailure(errorMessage));
  }
}

export function* testSaga() {
  yield takeEvery('test/loadTestStart', loadTestWorker);
}
