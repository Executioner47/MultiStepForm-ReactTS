import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Buttons from "./Buttons";
import { useGlobalContext } from "../utils/Context";

const schema = z.object({
  name: z.string().nonempty("The field is required"),
  email: z
    .string()
    .nonempty("The field is required")
    .email({ message: "Must be a valid email" }),
  number: z.string().nonempty("The field is required"),
});

type Schema = z.infer<typeof schema>;

export default function PersonalInfo() {
  const { data, setData, goNext } = useGlobalContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: data?.info,
  });

  const onSubmit = (data: Schema) => {
    setData((prevValue: any) => ({
      ...prevValue,
      info: data,
    }));
    goNext();
  };

  return (
    <form
      action=""
      className="md:w-3/5 md:mt-8 flex flex-col justify-between items-center -bg--clr-White md:bg-transparent mt-16 p-7 md:p-0 rounded-lg z-20"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <h1 className="font-bold text-3xl -text--clr-Marine-Blue mb-1">
          Personal info
        </h1>
        <p className="-text--clr-Cool-Gray text-lg mb-6">
          Please provide your name, email address and phone number.
        </p>
        <div className="input flex flex-col">
          <div className="flex items-center justify-between">
            <label htmlFor="" className="mb-1 font-semibold">
              Name
            </label>
            <span className="-text--clr-Strawberry-Red font-bold text-sm">
              {errors?.name?.message && <p>{errors.name.message}</p>}
            </span>
          </div>
          <input
            type="text"
            placeholder="Fares"
            className=" bg-transparent ring-1 ring-gray-200 rounded-md px-4 py-1.5 mb-4  font-bold focus:outline-none focus:ring-1 focus:-ring--clr-Purplish-Blue"
            autoFocus={true}
            {...register("name")}
          />
        </div>
        <div className="input flex flex-col">
          <div className="flex items-center justify-between">
            <label htmlFor="" className="mb-1 font-semibold">
              Email Address
            </label>
            <span className="-text--clr-Strawberry-Red font-bold text-sm">
              {errors?.email?.message && <p>{errors.email.message}</p>}
            </span>
          </div>
          <input
            type="email"
            placeholder="example@gmail.com"
            className=" bg-transparent ring-1 ring-gray-200 rounded-md px-4 py-1.5 mb-4 font-bold focus:outline-none focus:ring-1 focus:-ring--clr-Purplish-Blue"
            {...register("email")}
          />
        </div>
        <div className="input flex flex-col">
          <div className="flex items-center justify-between">
            <label htmlFor="" className="mb-1 font-semibold">
              Phone Number
            </label>
            <span className="-text--clr-Strawberry-Red font-bold text-sm">
              {errors?.number?.message && <p>{errors.number.message}</p>}
            </span>
          </div>
          <input
            type="text"
            placeholder="e.g. +1 234 567 890"
            className="placeholder:-text--clr-Cool-Gray bg-transparent ring-1 ring-gray-200 rounded-md px-4 py-1.5 mb-4 font-bold focus:outline-none focus:ring-1 focus:-ring--clr-Purplish-Blue"
            {...register("number")}
          />
        </div>
      </div>
      <Buttons />
    </form>
  );
}
