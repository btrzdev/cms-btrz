import Link from "next/link";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn, checkToken } from "./Login/Login";

type LoginInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginInputs>();
  const onSubmit: SubmitHandler<LoginInputs> = (data) => signIn(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <h1 className="text-[40px] font-semibold">Sign in to your account</h1>
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
          placeholder="youremail@email.com"
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
          placeholder="......."
          {...register("password")}
          required
        />
      </div>
      <span className="text-gray-600 text-[14px]">
        {" "}
        Dont have an account?{" "}
        <Link
          href="/RegisterPage"
          className="hover:underline hover:text-blue-600"
        >
          Register here
        </Link>
      </span>

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

export default LoginForm;
