import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { createClient } from "./Clients";

interface CreateNewClient {
  data: Client[];
  setData: (value: Client[]) => void;
  setShowModal: (value: boolean) => void;
}

const CreateNewClient: React.FC<CreateNewClient> = ({
  setShowModal,
  data,
  setData,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Client>();

  let localStorageLoaded;
  if (typeof window !== "undefined") {
    localStorageLoaded = localStorage;
  } else {
    localStorageLoaded = null;
  }
  const localStorageData = localStorageLoaded?.getItem("data");
  const initialData = localStorageData
    ? Array(JSON.parse(localStorageData))
    : [];

  useEffect(() => console.log("Type of data", data));

  const onSubmit: SubmitHandler<Client> = (newData) => {
    const updatedData = [...data, newData];
    setData(updatedData);
    createClient(updatedData);
  };

  //useEffect(() => console.log("Clients", data));

  return (
    <div className="fixed w-[600px] p-10 bg-gray-200 rounded-md">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <button
          className="text-[30px] absolute right-10 top-5"
          type="button"
          onClick={() => setShowModal(false)}
        >
          {" "}
          x{" "}
        </button>
        <h1 className="text-[35px] font-semibold">Add client</h1>
        <div>
          <label
            htmlFor="firstName"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            First Name*
          </label>
          <input
            type="text"
            id="firstName"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 p-3 focus:border-blue-500 block w-full"
            placeholder="youremail@email.com"
            {...register("firstName")}
            required
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Last Name*
          </label>
          <input
            type="text"
            id="lastname"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 p-3 focus:border-blue-500 block w-full"
            placeholder="youremail@email.com"
            {...register("lastName")}
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Email*
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
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Adress*
          </label>
          <input
            type="text"
            id="address"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 p-3 focus:border-blue-500 block w-full"
            {...register("address")}
            required
          />
        </div>
        <div>
          <label
            htmlFor="Company"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Company
          </label>
          <input
            type="text"
            id="company"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 p-3 focus:border-blue-500 block w-full"
            placeholder="......."
            {...register("company")}
          />
        </div>
        <div>
          <label
            htmlFor="Phone"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Phone
          </label>
          <input
            type="text"
            id="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 p-3 focus:border-blue-500 block w-full"
            placeholder="......."
            {...register("phone")}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full text-white font-semibold text-sm h-[40px] rounded-md bg-green-600"
        >
          {" "}
          Add Client{" "}
        </button>
      </form>
    </div>
  );
};

export default CreateNewClient;
