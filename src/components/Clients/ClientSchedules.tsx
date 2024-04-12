import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface ClientSchedulesProps {
  data: Client[];
  client: Client;
}

const ClientsSchedules: React.FC<ClientSchedulesProps> = ({ data, client }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Schedule>();

  const clientDataCopy = client;
  const oldClientsData = data;

  const [clientsUpdated, setClientsUpdated] = useState(oldClientsData);

  const addNewSchedule = (newSchedule: Schedule[]) => {
    const clientToAddSchedule = oldClientsData.find(
      (item: Client) => item.email === client.email
    );
    const updatedScheduleClients = {
      ...clientToAddSchedule,
      schedules: [...(clientToAddSchedule?.schedules ?? []), newSchedule],
    };
    const dataClientsToUpdate = [...clientsUpdated, updatedScheduleClients];
    console.log("clientDataCopy", clientDataCopy);
    const dataWithClientRemove = dataClientsToUpdate.filter(
      (item) =>
        (item.email === clientDataCopy.email &&
          (item.schedules?.length ?? 0) >= 1) ||
        item.email !== clientDataCopy.email
    );
    console.log("ClientToAddSchedule", dataWithClientRemove);
  };
  const onSubmit: SubmitHandler<Schedule> = (newSchedule) =>
    addNewSchedule(newSchedule);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 w-[300px] h-[300px] mt-10"
    >
      <div>
        <h1 className="text-[30px] text-gray-800 font-semibold">
          {" "}
          Add new schedule{" "}
        </h1>
      </div>
      <div>
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Description
        </label>
        <input
          type="text"
          id="description"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 p-3 focus:border-blue-500 block w-full"
          placeholder="Type here a short description"
          {...register("description")}
          minLength={1}
          required
        />
      </div>
      <div>
        <label
          htmlFor="date"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Date
        </label>
        <input
          type="date"
          id="date"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 p-3 focus:border-blue-500 block w-full"
          {...register("date")}
          minLength={1}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full hover:brightness-75 text-white font-semibold text-[18px] h-[40px] rounded-md bg-gradient-to-r from-[#2A64DB] via-[#204EB6] to-[#193A8C]"
      >
        {" "}
        Create{" "}
      </button>
    </form>
  );
};
export default ClientsSchedules;
