type NavigatorProps = {
  currentStepIndex: number;
};

function StepNavigator({ currentStepIndex }: NavigatorProps) {
  return (
    <div
      className="absolute top-0 -left-1/2 md:left-0 translate-x-1/2 md:translate-x-0 w-full md:bg-[url('./images/bg-sidebar-desktop.svg')] 
      flex flex-row gap-x-10 md:gap-0 justify-center md:justify-start md:block bg-[url('./images/bg-sidebar-mobile.svg')] 
      bg-no-repeat bg-cover bg-center rounded-md px-8 py-14 md:w-1/3 md:relative"
    >
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
            <div className="info uppercase hidden md:block">
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
