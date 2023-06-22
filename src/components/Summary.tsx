import { useGlobalContext } from "../utils/Context";
import Buttons from "./Buttons";

export default function Summary() {
  const { data, setCurrentStepIndex } = useGlobalContext();
  return (
    <form action="" className="w-3/5 mt-8 flex flex-col justify-between">
      <div>
        <h1 className="font-bold text-3xl -text--clr-Marine-Blue mb-1">
          Finishing up
        </h1>
        <p className="-text--clr-Cool-Gray text-lg mb-6">
          Double-check everything look OK before confirming.
        </p>
        <div className="info -bg--clr-Magnolia p-4 rounded-lg">
          <div className="flex justify-between items-center pb-8 mb-4 border-b-2 border-gray-200">
            <div className="left font-bold">
              <div className="summaryName">
                {data?.plan?.name} (
                {data?.plan?.isYearly ? "Yearly" : "Monthly"})
              </div>
              <button
                className="-text--clr-Cool-Gray underline text-sm capitalize"
                onClick={() => setCurrentStepIndex(1)}
              >
                change
              </button>
            </div>
            <div className="right font-bold">
              $
              {data?.plan?.isYearly
                ? data?.plan?.price.yearly + "/yr"
                : data?.plan?.price.monthly + "/mo"}
            </div>
          </div>
          {data?.addOns?.map((item: any, index) => {
            return (
              <div
                className="onlineServ flex justify-between items-center mb-2"
                key={index}
              >
                <div className="name -text--clr-Cool-Gray text-sm">
                  {item.name}
                </div>
                <div className="price font-semibold">
                  +
                  {data?.plan?.isYearly
                    ? item.price.yearly
                    : item.price.monthly}
                  {data?.plan?.isYearly ? "/yr" : "/mo"}
                </div>
              </div>
            );
          })}
        </div>
        <div className="total flex justify-between items-center mb-2 p-4">
          <div className="name -text--clr-Cool-Gray text-sm ">
            Total (per {data?.plan?.isYearly ? "Yearly" : "Monthly"})
          </div>
          <div className="price font-bold text-xl -text--clr-Purplish-Blue">
            +12{data?.plan?.isYearly ? "/yr" : "/mo"}
          </div>
        </div>
      </div>
      <Buttons />
    </form>
  );
}
