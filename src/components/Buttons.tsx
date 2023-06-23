import { useGlobalContext } from "../utils/Context";

export default function Buttons() {
  const { goBack, currentStepIndex } = useGlobalContext();

  return (
    <div className="flex absolute bottom-0 md:relative bg-white lg:p-0 sm:p-4 p-3 lg:bg-transparent w-full ">
      {currentStepIndex !== 0 && (
        <button
          role="btn"
          type="button"
          className="-text--clr-Light-Gray hover:-text--clr-Blue transition-all hover:font-semibold rounded-lg text-sm md:text-l"
          onClick={goBack}
        >
          Go Back
        </button>
      )}
      {currentStepIndex !== 4 && (
        <input
          role="btn"
          type="submit"
          value={"Next Step"}
          className="ms-auto cursor-pointer text-sm md:text-lg -bg--clr-Marine-Blue hover:-bg--clr-Blue transition-all px-5 py-1 sm:px-7 sm:py-2.5 rounded-lg text-white"
        />
      )}
    </div>
  );
}
