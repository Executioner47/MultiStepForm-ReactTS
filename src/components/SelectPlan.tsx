import { useState } from "react";
import Buttons from "./Buttons";
import myData from "../data.json";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useGlobalContext } from "../utils/Context";

const plans = {
  Arcade: {
    name: "Arcade",
    image: "./images/icon-arcade.svg",
    price: {
      monthly: 1,
      yearly: 10,
    },
  },
  "Larger Storage": {
    name: "Larger Storage",
    image: "./images/icon-advanced.svg",
    price: {
      monthly: 2,
      yearly: 20,
    },
  },
  Pro: {
    name: "Pro",
    image: "./images/icon-pro.svg",
    price: {
      monthly: 3,
      yearly: 30,
    },
  },
};

const schema = z.object({
  plan: z.enum(["Arcade", "Larger Storage", "Pro"]),
  isYearly: z.boolean(),
});

type Schema = z.infer<typeof schema>;

export default function SelectPlan() {
  const { setData, goNext } = useGlobalContext();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: { plan: "Arcade", isYearly: false },
  });

  const onSubmit = (data: Schema) => {
    setData((prevValue: any) => ({
      ...prevValue,
      plan: { ...plans[data.plan], isYearly: data.isYearly },
    }));
    goNext();
  };

  return (
    <form
      className="w-3/5 mt-8 flex flex-col justify-between"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <h1 className="font-bold text-3xl -text--clr-Marine-Blue mb-1">
          Select your plan
        </h1>
        <p className="-text--clr-Cool-Gray text-lg mb-6">
          You have the option of monthly or yearly billing.
        </p>
        <div className="cards flex gap-5 items-center mt-10">
          {myData.plan.map((item) => {
            return (
              <div className="flex-1">
                <input
                  type="radio"
                  id={item.name}
                  className="peer sr-only"
                  value={item.name}
                  {...register("plan")}
                />
                <label
                  className={`p-4 flex flex-col border cursor-pointer rounded-lg border-gray-300 peer-checked:ring-1 peer-checked:-ring--clr-Purplish-Blue peer-checked:-bg--clr-Magnolia/70 `}
                  htmlFor={item.name}
                  key={item.id}
                >
                  <img
                    src={item.image}
                    className="w-10 h-10 object-cover"
                    alt={item.name}
                    aria-hidden="true"
                  />
                  <div className="info mt-9">
                    <h3 className="font-semibold -text--clr-Marine-Blue text-lg">
                      {item.name}
                    </h3>
                    <div className="price -text--clr-Cool-Gray">
                      +$
                      {watch("isYearly")
                        ? item.price.yearly
                        : item.price.monthly}
                      /{watch("isYearly") ? "yr" : "mo"}
                    </div>
                    {watch("isYearly") && (
                      <div className="-text--clr-Marine-Blue text-sm font-semibold">
                        2 months free
                      </div>
                    )}
                  </div>
                </label>
              </div>
            );
          })}
        </div>
        <div>
          <input
            type="checkbox"
            id="yearly"
            className="sr-only"
            {...register("isYearly")}
          />
          <label
            htmlFor="yearly"
            className={`group flex justify-center items-center mb-4 -bg--clr-Magnolia rounded-lg py-2 mt-7 cursor-pointer ${
              watch("isYearly") ? "checked" : ""
            }`}
          >
            <div
              className={`text-sm mr-5 font-bold -text--clr-Marine-Blue group-[.checked]:-text--clr-Cool-Gray`}
            >
              Monthly
            </div>
            <div
              className={`relative inline-block w-12 h-6 rounded-full -bg--clr-Marine-Blue `}
            >
              <div
                className={`absolute top-1/2 -translate-y-1/2 left-1 w-4 h-4 rounded-full transform transition-transform bg-white group-[.checked]:translate-x-6`}
              ></div>
            </div>
            <div
              className={`text-sm ml-5 font-bold group-[.checked]:-text--clr-Marine-Blue -text--clr-Cool-Gray`}
            >
              Yearly
            </div>
          </label>
        </div>
      </div>
      <Buttons />
    </form>
  );
}
