import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
      action: PayloadAction<{ questionId: string; answer: string }>
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
