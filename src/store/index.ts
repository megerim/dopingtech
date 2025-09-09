import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import testReducer from './slices/testSlice';
import { rootSaga } from './sagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    test: testReducer,
  },
  middleware: (getDefault) =>
    getDefault({ thunk: false, serializableCheck: false }).concat(
      sagaMiddleware,
    ),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
