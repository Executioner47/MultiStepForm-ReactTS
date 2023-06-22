import { useGlobalContext } from "../utils/Context";

export default function Buttons() {
  const { goNext, goBack, currentStepIndex } = useGlobalContext();

  return (
    <div className="flex">
      {currentStepIndex !== 0 && (
        <button
          role="btn"
          type="button"
          className="-text--clr-Light-Gray hover:-text--clr-Blue transition-all hover:font-semibold rounded-lg text-lg"
          onClick={goBack}
        >
          Go Back
        </button>
      )}
      {currentStepIndex !== 3 ? (
        <input
          role="btn"
          type="submit"
          value={"Next Step"}
          className="ms-auto cursor-pointer -bg--clr-Marine-Blue hover:-bg--clr-Blue transition-all px-7 py-2.5 rounded-lg text-white text-lg"
        />
      ) : (
        <button
          role="btn"
          type="button"
          className="ms-auto -bg--clr-Marine-Blue hover:-bg--clr-Purplish-Blue/50 transition-all px-7 py-2.5 rounded-lg text-white text-lg"
          onClick={goNext}
        >
          Confirm
        </button>
      )}
    </div>
  );
}
