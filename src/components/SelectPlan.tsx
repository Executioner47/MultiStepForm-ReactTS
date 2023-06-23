import Buttons from "./Buttons";
import myData from "../data.json";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useGlobalContext } from "../utils/Context";
import { useEffect } from "react";

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
  plan: z
    .enum(["Arcade", "Larger Storage", "Pro"])
    .nullable()
    .refine((value) => value !== null, {
      message: "Please select a plan",
    }),
  isYearly: z.boolean(),
});

type Schema = z.infer<typeof schema>;

export default function SelectPlan() {
  const { data, setData, goNext } = useGlobalContext();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  console.log(errors);

  useEffect(() => {
    if (data?.plan) {
      setValue("plan", data.plan.name as "Arcade" | "Larger Storage" | "Pro");
      setValue("isYearly", data.plan.isYearly);
    }
  }, [data, setValue]);

  const onSubmit = (data: Schema) => {
    const selectedPlan = data.plan as keyof typeof plans;
    setData((prevValue: any) => ({
      ...prevValue,
      plan: { ...plans[selectedPlan], isYearly: data.isYearly },
    }));
    goNext();
  };

  return (
    <form
      className="md:w-3/5 md:mt-8 flex flex-col justify-between items-center md:items-stretch -bg--clr-White md:bg-transparent mt-52 p-7 md:p-0 rounded-lg z-20"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <h1 className="font-bold text-3xl -text--clr-Marine-Blue mb-1">
          Select your plan
        </h1>
        <div className="-text--clr-Cool-Gray text-lg mb-6">
          You have the option of monthly or yearly billing.
          <span>
            {errors && errors.plan && (
              <p className="text-red-500">{errors.plan.message}</p>
            )}
          </span>
        </div>

        <div className="cards flex flex-col md:flex-row gap-5 md:items-center mt-10">
          {myData.plan.map((item) => {
            return (
              <div className="flex-1" key={item.id}>
                <input
                  type="radio"
                  id={item.name}
                  className="peer sr-only"
                  value={item.name}
                  {...register("plan")}
                />
                <label
                  className={`p-4 flex flex-row md:flex-col gap-x-4 md:gap-0 border cursor-pointer rounded-lg border-gray-300 peer-checked:ring-1 peer-checked:-ring--clr-Purplish-Blue peer-checked:-bg--clr-Magnolia/70 `}
                  htmlFor={item.name}
                  key={item.id}
                >
                  <img
                    src={item.image}
                    className="w-10 h-10 object-cover"
                    alt={item.name}
                    aria-hidden="true"
                  />
                  <div className="info md:mt-9">
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
