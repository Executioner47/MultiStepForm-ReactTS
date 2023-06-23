import { useState } from "react";
import myData from "../data.json";
import Buttons from "./Buttons";
import { useGlobalContext } from "../utils/Context";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface AddOn {
  name: string;
}

const schema = z.object({
  addOns: z
    .array(z.enum(["Online Service", "Larger Storage", "Customizable Profile"]))
    .nullable(),
});

type Schema = z.infer<typeof schema>;

export default function AddOns() {
  const [selectedAddOns, setSelectedAddOns] = useState<(AddOn | string)[]>([]);
  console.log(selectedAddOns);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const { setData, goNext, data } = useGlobalContext();

  const handleCardClick = (index: number) => {
    setActiveCardIndex(index);
    const { name } = myData.addOns[index];

    setSelectedAddOns((prevSelectedAddOns) => {
      const addonIndex = prevSelectedAddOns.findIndex((item) => item === name);

      if (addonIndex !== -1) {
        const updatedSelectedAddOns = [...prevSelectedAddOns];
        updatedSelectedAddOns.splice(addonIndex, 1);
        return updatedSelectedAddOns;
      } else {
        return [...prevSelectedAddOns, name];
      }
    });
  };

  const { control, handleSubmit } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: { addOns: [] },
  });

  const onSubmit = (data: Schema) => {
    setData((prevData: any) => ({ ...prevData, addOns: data.addOns }));
    goNext();
  };

  return (
    <form
      action=""
      className="md:w-3/5 md:mt-8 flex flex-col justify-between items-center md:items-stretch -bg--clr-White md:bg-transparent mt-72 p-7 md:p-0 rounded-lg z-20"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <h1 className="font-bold text-2xl md:text-3xl -text--clr-Marine-Blue mb-1">
          Pick add-ons
        </h1>
        <p className="-text--clr-Cool-Gray text-sm md:text-lg mb-3 md:mb-6">
          Add-ons help enhance your gaming experience.
        </p>

        {myData.addOns.map((item, index) => {
          return (
            <div
              className={`backgroundCheck p-2 md:p-3 rounded-lg flex items-center gap-x-5 ring-2 ring-gray-200 select-none mb-5 ${
                activeCardIndex === index ? "bg-primary" : ""
              }`}
              key={item.id}
              onClick={() => handleCardClick(index)}
            >
              <Controller
                control={control}
                name="addOns"
                render={({ field: { onChange, value } }) => (
                  <input
                    type="checkbox"
                    id={item.name}
                    value={item.name}
                    checked={(value as string[])?.includes(item?.name)}
                    className="cursor-pointer form-checkbox h-5 w-5 text-primary border-gray-300 rounded focus:ring-primary"
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      const selectedAddon = item.name;
                      onChange(
                        isChecked
                          ? [...(value as string[]), selectedAddon]
                          : (value as string[]).filter(
                              (addon: string) => addon !== selectedAddon
                            )
                      );
                    }}
                  />
                )}
              />
              <label
                htmlFor={item.name}
                className="info w-full cursor-pointer selection:bg-purple-300 selection:text-purple-900"
                onClick={() => handleCardClick(item.id - 1)}
              >
                <h3 className="font-semibold -text--clr-Marine-Blue text-sm md:text-lg">
                  {item.name}
                </h3>
                <div className="price -text--clr-Cool-Gray text-xs md:text-sm">
                  {item.details}
                </div>
              </label>
              <div className="price -text--clr-Purplish-Blue font-semibold text-xs md:text-sm">
                +${data?.plan.isYearly ? item.price.yearly : item.price.monthly}
                /{data?.plan.isYearly ? "yr" : "mo"}
              </div>
            </div>
          );
        })}
      </div>
      <Buttons />
    </form>
  );
}
