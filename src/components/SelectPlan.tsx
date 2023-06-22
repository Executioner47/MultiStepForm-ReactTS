import { useState } from "react";
import Buttons from "./Buttons";
import myData from "../data.json";
import { useGlobalContext } from "../utils/Context";

export default function SelectPlan() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(myData.plan[0]);
  const { setData, goNext } = useGlobalContext();

  const handleCardClick = (index: number) => {
    setActiveCardIndex(index);
    setSelectedPlan(myData.plan[index]);
  };
  const handleToggle = () => {
    setIsYearly((prevValue) => !prevValue);
  };

  let handleSubmit = (e: any) => {
    e.preventDefault();
    let { name, price } = selectedPlan;
    setData((prevValue: any) => ({
      ...prevValue,
      plan: { name, price, isYearly: isYearly },
    }));
    goNext();
  };

  return (
    <form
      className="w-3/5 mt-8 flex flex-col justify-between"
      onSubmit={handleSubmit}
    >
      <div>
        <h1 className="font-bold text-3xl -text--clr-Marine-Blue mb-1">
          Select your plan
        </h1>
        <p className="-text--clr-Cool-Gray text-lg mb-6">
          You have the option of monthly or yearly billing.
        </p>
        <div className="cards flex gap-x-5 items-center mt-10">
          {myData.plan.map((item) => {
            return (
              <div
                className={`p-4 flex flex-1 flex-col border cursor-pointer  rounded-lg  ${
                  activeCardIndex === item.id - 1
                    ? "ring-1 -ring--clr-Purplish-Blue -bg--clr-Magnolia/70"
                    : "border-gray-300"
                }`}
                key={item.id}
                onClick={() => handleCardClick(item.id - 1)}
              >
                <img
                  src={item.image}
                  className="w-10 h-10 object-cover"
                  alt={item.name}
                />
                <div className="info mt-9">
                  <h3 className="font-semibold -text--clr-Marine-Blue text-lg">
                    {item.name}
                  </h3>
                  <div className="price -text--clr-Cool-Gray">
                    +${isYearly ? item.price.yearly : item.price.monthly}/
                    {isYearly ? "yr" : "mo"}
                  </div>
                  {isYearly && (
                    <div className="-text--clr-Marine-Blue text-sm font-semibold">
                      2 months free
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="toggler flex justify-center items-center mb-4 -bg--clr-Magnolia rounded-lg py-2 mt-7">
          <div
            className={`text-sm mr-5 font-bold ${
              !isYearly ? "-text--clr-Marine-Blue " : "-text--clr-Cool-Gray"
            }`}
          >
            Monthly
          </div>
          <div
            className={`relative cursor-pointer inline-block w-12 h-6 rounded-full -bg--clr-Marine-Blue `}
            onClick={handleToggle}
          >
            <div
              className={`absolute top-1/2 -translate-y-1/2 left-1 w-4 h-4 rounded-full transform transition-transform bg-white ${
                isYearly ? "translate-x-6 " : ""
              }`}
            ></div>
          </div>
          <div
            className={`text-sm ml-5 font-bold ${
              isYearly ? "-text--clr-Marine-Blue " : "-text--clr-Cool-Gray"
            }`}
          >
            Yearly
          </div>
        </div>
      </div>
      <Buttons />
    </form>
  );
}
