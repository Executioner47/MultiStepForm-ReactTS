import AddOns from "./components/AddOns";
import PersonalInfo from "./components/PersonalInfo";
import SelectPlan from "./components/SelectPlan";
import StepNavigator from "./components/StepNavigator";
import Summary from "./components/Summary";
import { useEffect } from "react";
import { useGlobalContext } from "./utils/Context";

function App() {
  const { goNext, goBack, currentStepIndex } = useGlobalContext();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.keyCode === 39 &&
        event.target instanceof HTMLElement &&
        event.target.tagName !== "INPUT"
      ) {
        goNext();
      }
      if (
        event.keyCode === 37 &&
        event.target instanceof HTMLElement &&
        event.target.tagName !== "INPUT"
      ) {
        goBack();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [goNext, goBack]);

  return (
    <div className="-bg--clr-Light-Gray  h-screen flex justify-center items-center">
      <div className="-bg--clr-White rounded-lg p-4 gap-20 flex justify-center min-w-[900px] h-[580px]">
        <StepNavigator currentStepIndex={currentStepIndex} />
        {(() => {
          switch (currentStepIndex) {
            case 0:
              return <PersonalInfo />;
            case 1:
              return <SelectPlan />;
            case 2:
              return <AddOns />;
            case 3:
              return <Summary />;
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
}

export default App;
