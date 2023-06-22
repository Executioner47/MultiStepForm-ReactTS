import { useState } from "react";
import myData from "../data.json";
import Buttons from "./Buttons";
import { useGlobalContext } from "../utils/Context";

interface Plan {
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
}

export default function AddOns() {
  const [selectedAddOns, setSelectedAddOns] = useState<Plan[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const { setData, goNext } = useGlobalContext();

  const handleCardClick = (index: number) => {
    setActiveCardIndex(index);
    const { name, price } = myData.addOns[index];
    const selectedAddon = { name, price };

    setSelectedAddOns((prevSelectedAddOns) => {
      const addonIndex = prevSelectedAddOns.findIndex(
        (item) => item.name === selectedAddon.name
      );

      if (addonIndex !== -1) {
        const updatedSelectedAddOns = [...prevSelectedAddOns];
        updatedSelectedAddOns.splice(addonIndex, 1);
        return updatedSelectedAddOns;
      } else {
        return [...prevSelectedAddOns, selectedAddon];
      }
    });
  };
  console.log(selectedAddOns);

  let handleSubmit = (e: any) => {
    e.preventDefault();
    setData((prevValue: any) => ({
      ...prevValue,
      addOns: selectedAddOns,
    }));
    goNext();
  };

  return (
    <form
      action=""
      className="w-3/5 mt-8 flex flex-col justify-between"
      onSubmit={handleSubmit}
    >
      <div>
        <h1 className="font-bold text-3xl -text--clr-Marine-Blue mb-1">
          Pick add-ons
        </h1>
        <p className="-text--clr-Cool-Gray text-lg mb-6">
          Add-ons help enhance your gaming experience.
        </p>
        {myData.addOns.map((item) => {
          return (
            <div
              className="backgroundCheck p-3 rounded-lg flex items-center justify-between gap-x-5 ring-2 ring-gray-200 select-none mb-5"
              key={item.id}
            >
              <div className="left flex items-center gap-x-5 flex-1">
                <input
                  type="checkbox"
                  id={`checkbox-list#${item.id}`}
                  className="cursor-pointer relative rounded-sm float-left h-[1.125rem] w-[1.3rem] appearance-none border-[0.125rem] border-solid border-neutral-300 outline-none  before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:content-[''] checked:-border--clr-Purplish-Blue checked:-bg--clr-Purplish-Blue checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:before:opacity-[0.04] focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none"
                />
                <label
                  htmlFor={`checkbox-list#${item.id}`}
                  className="info w-full cursor-pointer"
                  onClick={() => handleCardClick(item.id - 1)}
                >
                  <h3 className="font-semibold -text--clr-Marine-Blue text-lg">
                    {item.name}
                  </h3>
                  <div className="price -text--clr-Cool-Gray">
                    {item.details}
                  </div>
                </label>
              </div>
              {/* <div className="price -text--clr-Purplish-Blue font-semibold">
                +${data?.plan.isYearly ? item.price.yearly : item.price.monthly}
                /{data?.plan.isYearly ? "yr" : "mo"}
              </div> */}
            </div>
          );
        })}
      </div>
      <Buttons />
    </form>
  );
}
