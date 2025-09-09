import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';

export type Question = {
  id: string;
  description?: string;
  question: string;
  text?: string;
  options: Record<string, string>;
  correctAnswer?: string;
};

interface TestState {
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: Record<string, string>;
  isLoading: boolean;
  error: string | null;
  isFinished: boolean;
  showAnswers: boolean;
}

const initialState: TestState = {
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: {},
  isLoading: false,
  error: null,
  isFinished: false,
  showAnswers: false,
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    loadTestStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loadTestSuccess: (state, action: PayloadAction<Question[]>) => {
      state.isLoading = false;
      state.questions = action.payload;
      state.currentQuestionIndex = 0;
      state.userAnswers = {};
      state.isFinished = false;
      state.showAnswers = false;
    },
    loadTestFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    selectAnswer: (
      state,
      action: PayloadAction<{ questionId: string; answer: string }>,
    ) => {
      if (state.isFinished) return;
      const { questionId, answer } = action.payload;
      state.userAnswers[questionId] = answer;
    },
    goToNextQuestion: (state) => {
      if (state.isFinished) return;
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      }
    },
    goToPreviousQuestion: (state) => {
      if (state.isFinished) return;
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex -= 1;
      }
    },
    setCurrentQuestionIndex: (state, action: PayloadAction<number>) => {
      const idx = action.payload;
      if (idx >= 0 && idx < state.questions.length) {
        state.currentQuestionIndex = idx;
      }
    },
    finishTest: (state) => {
      state.isFinished = true;
    },
    toggleShowAnswers: (state) => {
      if (!state.isFinished) return; // only allow after finishing test
      state.showAnswers = !state.showAnswers;
    },
  },
});

export const {
  loadTestStart,
  loadTestSuccess,
  loadTestFailure,
  selectAnswer,
  goToNextQuestion,
  goToPreviousQuestion,
  setCurrentQuestionIndex,
  finishTest,
  toggleShowAnswers,
} = testSlice.actions;

export default testSlice.reducer;

// Selectors
const selectQuestions = (state: RootState) => state.test.questions;
const selectUserAnswers = (state: RootState) => state.test.userAnswers;

// Memoized selector for test statistics
export const selectTestStats = createSelector(
  [selectQuestions, selectUserAnswers],
  (questions, userAnswers) => {
    let correct = 0;
    let wrong = 0;
    let empty = 0;

    questions.forEach((question: Question) => {
      const userAnswer = userAnswers[question.id];
      if (!userAnswer) {
        empty++;
      } else if (userAnswer === question.correctAnswer) {
        correct++;
      } else {
        wrong++;
      }
    });

    const net = correct - Math.floor(wrong / 3);
    return { correct, wrong, empty, net };
  },
);
