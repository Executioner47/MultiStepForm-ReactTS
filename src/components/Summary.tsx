import { useGlobalContext } from "../utils/Context";
import Buttons from "./Buttons";
import myData from "../data.json";

export default function Summary() {
  const { data, setCurrentStepIndex, goNext } = useGlobalContext();

  let totalPrice = 0;
  if (data?.plan) {
    totalPrice += data.plan.isYearly
      ? data.plan.price.yearly
      : data.plan.price.monthly;
  }
  if (data?.addOns) {
    data.addOns.forEach((item: any) => {
      let addOn = myData.addOns.find((addon) => addon.name === item);
      if (addOn) {
        totalPrice += data.plan.isYearly
          ? addOn.price.yearly
          : addOn.price.monthly;
      }
    });
  }

  let handleSubmit = () => {
    goNext();
  };

  return (
    <form
      action=""
      className="md:w-3/5 md:mt-8 flex flex-col justify-between items-center md:items-stretch -bg--clr-White md:bg-transparent mt-72 p-6 md:p-0 rounded-lg z-20"
      onSubmit={handleSubmit}
    >
      <div>
        <h1 className="font-bold text-2xl md:text-3xl -text--clr-Marine-Blue mb-1">
          Finishing up
        </h1>
        <p className="-text--clr-Cool-Gray text-sm md:text-lg mb-6">
          Double-check everything look OK before confirming.
        </p>
        <div className="info -bg--clr-Magnolia p-3 md:p-4 rounded-lg">
          <div
            className={`flex justify-between items-center ${
              data?.addOns.length === 0 ? " " : "pb-8 mb-4 border-b-2"
            } border-gray-200`}
          >
            <div className="left font-bold">
              <div className="summaryName text-sm md:text-lg">
                {data?.plan?.name} (
                {data?.plan?.isYearly ? "Yearly" : "Monthly"})
              </div>
              <button
                className="-text--clr-Cool-Gray underline text-xs md:text-sm capitalize"
                onClick={() => setCurrentStepIndex(1)}
              >
                change
              </button>
            </div>
            <div className="right font-bold text-xs md:text-sm">
              $
              {data?.plan?.isYearly
                ? data?.plan?.price.yearly + "/yr"
                : data?.plan?.price.monthly + "/mo"}
            </div>
          </div>
          {data?.addOns?.map((item: any, index) => {
            let addOn = myData.addOns.find((addon) => addon.name === item);
            return (
              <div
                className="onlineServ flex justify-between items-center mb-2"
                key={index}
              >
                <div className="name -text--clr-Cool-Gray text-xs md:text-sm">
                  {item}
                </div>
                <div className="price font-semibold text-xs md:text-sm">
                  +
                  {data?.plan?.isYearly
                    ? addOn?.price.yearly
                    : addOn?.price.monthly}
                  {data?.plan?.isYearly ? "/yr" : "/mo"}
                </div>
              </div>
            );
          })}
        </div>
        <div className="total flex justify-between items-center mb-2 p-2 md:p-4">
          <div className="name -text--clr-Cool-Gray text-sm ">
            Total (per {data?.plan?.isYearly ? "Yearly" : "Monthly"})
          </div>
          <div className="price font-bold text-lg md:text-xl -text--clr-Purplish-Blue">
            +{totalPrice}
            {data?.plan?.isYearly ? "/yr" : "/mo"}
          </div>
        </div>
      </div>
      <Buttons />
    </form>
  );
}
