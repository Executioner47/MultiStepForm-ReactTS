import { ReactElement, useState } from "react";

export default function useMultiStepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function goNext() {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  }

  function goBack() {
    setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  }

  function goToStep(stepIndex: number) {
    setCurrentStepIndex(stepIndex);
  }

  return {
    currentStepIndex,
    currentForm: steps[currentStepIndex],
    steps,
    goBack,
    goNext,
    goToStep,
  };
}
