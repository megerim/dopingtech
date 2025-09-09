import { useEffect, useRef } from 'react';

export const useOpticScroll = (currentQuestionIndex: number) => {
  const opticScrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = opticScrollAreaRef.current;
    if (!container) return;

    const targetQuestionElement = container.querySelector(
      `[data-question-index="${currentQuestionIndex}"]`,
    ) as HTMLElement;

    if (targetQuestionElement) {
      targetQuestionElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentQuestionIndex]);

  return opticScrollAreaRef;
};
