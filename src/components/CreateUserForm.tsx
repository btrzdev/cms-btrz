import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type CreateUserInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  securePasswordFlag: true;
};

const CreateUserForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateUserInput>();
  const onSubmit: SubmitHandler<CreateUserInput> = (data) =>
    console.log("data", data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div>
        <h1 className="text-[40px] font-semibold">érre.cms</h1>
      </div>
      <div>
        <label
          htmlFor="firstName"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 p-3 focus:border-blue-500 block w-full"
          placeholder="Your first name"
          {...register("firstName")}
          required
        />
      </div>
      <div>
        <label
          htmlFor="lastName"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 p-3 focus:border-blue-500 block w-full"
          placeholder="Your last name"
          {...register("lastName")}
          required
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Email
        </label>
        <input
          type="text"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 p-3 focus:border-blue-500 block w-full"
          placeholder="Your email"
          {...register("email")}
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Password
        </label>
        <input
          type="text"
          id="Password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 p-3 focus:border-blue-500 block w-full"
          placeholder="Password"
          {...register("password")}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full text-white font-semibold text-sm h-[40px] rounded-md bg-gradient-to-r from-[#2A64DB] via-[#204EB6] to-[#193A8C]"
      >
        {" "}
        Sign In{" "}
      </button>
    </form>
  );
};

export default CreateUserForm;
