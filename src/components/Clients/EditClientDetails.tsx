import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { createClient } from "./Clients";
import Modal from "../Modal/Modal";

interface CreateNewClient {
  data: Client[];
  clientDetails: Client | null | undefined;
  setClientDetails: (value: Client) => void;
  setData: (value: Client[]) => void;
  setShowEditClientModal: (value: boolean) => void;
}

const EditClientDetails: React.FC<CreateNewClient> = ({
  data,
  clientDetails,
  setClientDetails,
  setData,
  setShowEditClientModal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Client>();

  const editSelectedItem = async (newData: any) => {
    const getItemToRemoveItem = data.filter(
      (item: Client) => item.email !== clientDetails?.email
    );

    const clientToEdit = data.find(
      (item: Client) => item.email === clientDetails?.email
    );

    const updatedClient = {
      ...clientToEdit,
      ...newData,
    };

    const updatedData = [
      ...getItemToRemoveItem.filter(
        (item: Client) => item.email !== clientDetails?.email
      ),
      updatedClient,
    ];

    setData(updatedData);
    await createClient(updatedData);

    setClientDetails(newData);

    setShowEditClientModal(false);
  };

  const onSubmit: SubmitHandler<Client> = async (newData) => {
    editSelectedItem(newData);
  };

  return (
    <Modal closeModal={setShowEditClientModal}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-[600px]"
      >
        <h1 className="text-[35px] font-semibold">Edit client data</h1>
        <div className="flex gap-10">
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
              defaultValue={clientDetails?.firstName}
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
              id="lastname"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 p-3 focus:border-blue-500 block w-full"
              defaultValue={clientDetails?.lastName}
              {...register("lastName")}
              required
            />
          </div>
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
            defaultValue={clientDetails?.email}
            {...register("email")}
            required
          />
        </div>
        <div>
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 p-3 focus:border-blue-500 block w-full"
            {...register("address")}
            defaultValue={clientDetails?.address}
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
            defaultValue={clientDetails?.company}
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
            defaultValue={clientDetails?.phone}
            {...register("phone")}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full text-white font-semibold text-sm h-[40px] rounded-md bg-blue-600"
        >
          {" "}
          Edit{" "}
        </button>
      </form>
    </Modal>
  );
};

export default EditClientDetails;
