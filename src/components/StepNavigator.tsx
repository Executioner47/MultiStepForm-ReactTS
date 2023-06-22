type NavigatorProps = {
  currentStepIndex: number;
};

function StepNavigator({ currentStepIndex }: NavigatorProps) {
  return (
    <div className="xl:bg-[url('./images/bg-sidebar-desktop.svg')] bg-[url('./images/bg-sidebar-mobile.svg')] bg-no-repeat bg-cover bg-center rounded-lg px-8 py-10 w-1/3 relative">
      {["your info", "select plan", "add-ons", "summary"].map((item, index) => {
        return (
          <div className="flex items-center gap-x-4 mb-5" key={index}>
            <div
              className={`step p-2 flex items-center justify-center w-9 h-9 ${
                currentStepIndex + 1 === index + 1
                  ? "-bg--clr-Light-Blue text-black"
                  : "border-2 border-white text-white"
              }  rounded-full font-semibold`}
            >
              {index + 1}
            </div>
            <div className="info uppercase">
              <div className="-text--clr-Cool-Gray text-sm">
                Step {index + 1}
              </div>
              <div className="font-semibold tracking-wider text-white">
                {item}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StepNavigator;
