import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createClient } from "./Clients";
import Modal from "../Modal/Modal";

interface ClientSchedulesProps {
  data: Client[];
  setData: any;
  client: Client;
  setShowCreateNoteModal: any;
}

const ClientsNotesModal: React.FC<ClientSchedulesProps> = ({
  data,
  setData,
  client,
  setShowCreateNoteModal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Note>();

  const oldClientsData = data;

  const [clientsUpdated, setClientsUpdated] = useState(oldClientsData);

  const addNewNote = async (newNote: Note) => {
    const clientToAddSchedule = clientsUpdated.find(
      (item: Client) => item.email === client.email
    );
    const updatedNotesClient = {
      ...clientToAddSchedule,
      notes: [...(clientToAddSchedule?.notes ?? []), newNote],
    };

    const removeDuplicatedClient = oldClientsData.filter(
      (item) =>
        item.email !== client.email ||
        (item.email === client.email &&
          (item.notes?.length ?? 0) > (item.notes?.length ?? 0) + 1)
    );

    const dataClientsToUpdate: Client[] = [
      ...removeDuplicatedClient,
      updatedNotesClient as Client,
    ];

    createClient(dataClientsToUpdate);
    setData(dataClientsToUpdate);

    setShowCreateNoteModal(false);
  };
  const onSubmit: SubmitHandler<Note> = (newNote: Note) => addNewNote(newNote);
  return (
    <Modal closeModal={setShowCreateNoteModal}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 w-[300px] h-[300px] mt-10"
      >
        <div>
          <h1 className="text-[30px] text-gray-800 font-semibold">
            {" "}
            Add new note{" "}
          </h1>
        </div>
        <div>
          <textarea
            maxLength={100}
            id="note"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm h-[180px] rounded-lg focus:ring-blue-500 p-3 focus:border-blue-500 block w-full"
            placeholder="Type here a short note"
            {...register("note")}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full hover:brightness-75 text-white font-semibold text-[18px] h-[40px] rounded-md bg-gradient-to-r from-[#2A64DB] via-[#204EB6] to-[#193A8C]"
        >
          {" "}
          Create{" "}
        </button>
      </form>
    </Modal>
  );
};
export default ClientsNotesModal;
