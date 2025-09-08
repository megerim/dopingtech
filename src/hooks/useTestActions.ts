import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { finishTest, selectTestStats } from '../store/slices/testSlice';

export const useTestActions = () => {
  const dispatch = useAppDispatch();
  const stats = useAppSelector(selectTestStats);

  const handleConfirmLeave = useCallback(() => {
    dispatch(finishTest());
  }, [dispatch]);

  const handleConfirmFinish = useCallback(() => {
    console.log('Test Statistics:', {
      net: stats.net,
      correct: stats.correct,
      wrong: stats.wrong,
      empty: stats.empty
    });
    dispatch(finishTest());
    return true;
  }, [dispatch, stats]);

  return {
    handleConfirmLeave,
    handleConfirmFinish,
    stats
  };
};