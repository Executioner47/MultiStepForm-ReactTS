import React, {
  useState,
  useContext,
  createContext,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

interface AppProviderProps {
  children: ReactNode;
}

interface AppContextValue {
  data: null;
  setData: Dispatch<SetStateAction<null>>;
  currentStepIndex: number;
  setCurrentStepIndex: Dispatch<SetStateAction<number>>;
  goNext: () => void;
  goBack: () => void;
  goToStep: (stepIndex: number) => void;
}

const AppContext = createContext<AppContextValue>({
  data: null,
  setData: () => {},
  currentStepIndex: 0,
  setCurrentStepIndex: () => {},
  goNext: () => {},
  goBack: () => {},
  goToStep: () => {},
});

const AppProvider = ({ children }: AppProviderProps) => {
  const [data, setData] = useState<null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  console.log(data);

  function goNext() {
    setCurrentStepIndex((i) => {
      if (i >= 3) return i;
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

  return (
    <AppContext.Provider
      value={{
        data,
        setData,
        currentStepIndex,
        setCurrentStepIndex,
        goNext,
        goBack,
        goToStep,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
