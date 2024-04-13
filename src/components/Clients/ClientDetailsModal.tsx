import { useEffect, useState } from "react";
import { FaBuilding, FaEnvelope, FaPhone, FaPlusSquare } from "react-icons/fa";
import { createClient } from "./Clients";
import EditClientDetails from "./EditClientDetails";
import Modal from "../Modal/Modal";
import ClientsSchedules from "./ClientSchedulesModal";
import ClientsNotesModal from "./ClientNotesModal";
import { FaLocationPin } from "react-icons/fa6";
import ClientConfirmDeleteModal from "./ClientConfirmDeleteModal";

interface ClientDetailsProps {
  data: Client[];
  setData: (value: Client[]) => void;
  clientDetails: Client;
  setClientDetails: (value: Client | undefined) => void;
  showClientModal: boolean;
  setShowClientModal: (value: boolean) => void;
}
const ClientDetailsModal: React.FC<ClientDetailsProps> = ({
  data,
  setData,
  clientDetails,
  setClientDetails,
  setShowClientModal,
}) => {
  const [showEditClientModal, setShowEditClientModal] = useState(false);
  const [showCreateScheduleModal, setShowCreateScheduleModal] = useState(false);
  const [showCreateNoteModal, setShowCreateNoteModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const updatedClient = data.find(
      (item) => item.email === clientDetails?.email
    );
    if (updatedClient) {
      setClientDetails(updatedClient);
    } else {
      null;
    }
  }, [data, clientDetails, setClientDetails]);

  const removeSelectedClient = async () => {
    const getItemToRemoveItem = data.filter(
      (item: Client) => item.email !== clientDetails?.email
    );
    setData(getItemToRemoveItem);
    createClient(getItemToRemoveItem);

    setShowClientModal(false);
  };

  const exportJsonClientData = (clientDetails: Client) => {
    const stringfiedData = JSON.stringify(clientDetails);
    const blob = new Blob([stringfiedData], {
      type: "application/json",
    });

    const element = document.createElement("a");
    element.href = URL.createObjectURL(blob);
    element.download = `${clientDetails.firstName}.json`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <Modal closeModal={setShowClientModal}>
      <div className="w-[1200px] h-[800px]">
        <div className="flex gap-10 mt-5 flex-col">
          <div className="flex absolute bottom-10 right-10 gap-5">
            {" "}
            <button
              type="button"
              onClick={() => setShowEditClientModal(true)}
              className="w-[200px] hover:brightness-75 text-white font-semibold text-md h-[40px] rounded-md bg-gradient-to-r  bg-blue-500"
            >
              {" "}
              Edit client
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="w-[200px] hover:brightness-75 text-white font-semibold text-md h-[40px] rounded-md bg-gradient-to-r  bg-red-600"
            >
              {" "}
              Delete client{" "}
            </button>
          </div>
          <div className="flex gap-10">
            <div>
              <span className="font-normal">First name</span>
              <h4 className="text-[35px] font-semibold">
                {clientDetails?.firstName}
              </h4>
            </div>
            <div>
              <span className="font-normal">Last name</span>
              <h4 className="text-[35px] font-semibold">
                {clientDetails?.lastName}
              </h4>
            </div>
            <button
              type="button"
              onClick={() => exportJsonClientData(clientDetails)}
              className="w-[200px] hover:brightness-75 absolute right-[40px] top-[100px]  text-white font-semibold text-md h-[40px] rounded-md bg-gradient-to-r  bg-green-600"
            >
              {" "}
              Export JSON{" "}
            </button>
          </div>
          <div className="flex gap-10 flex-col">
            <div className="flex gap-5">
              <div className="flex gap-2 items-center">
                <FaEnvelope color="#2A64DB" size={25} />
                <h4>{clientDetails?.email}</h4>
              </div>
              <div className="flex gap-2 items-center">
                <FaPhone color="#2A64DB" size={25} />
                <h4>{clientDetails?.phone}</h4>
              </div>
              <div className="flex gap-2 items-center">
                <FaBuilding color="#2A64DB" size={25} />
                <h4>{clientDetails?.company}</h4>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <FaLocationPin color={"#2A64DB"} size={25} />
              <h4>{clientDetails?.address}</h4>
            </div>
          </div>
          {showEditClientModal && (
            <EditClientDetails
              data={data}
              setData={setData}
              setShowEditClientModal={setShowEditClientModal}
              clientDetails={clientDetails}
              setClientDetails={setClientDetails}
            />
          )}
        </div>
        <div className=" w-[500px] h-[500px] absolute mt-[100px] left-10">
          <div className="w-full justify-between flex px-4">
            {" "}
            <h2 className="text-[25px] font-semibold text-gray-800">Notes</h2>
            <button
              className="hover:brightness-50"
              onClick={() => setShowCreateNoteModal(true)}
            >
              <FaPlusSquare color={"#2A64DB"} size={25} />
            </button>
          </div>
          <div className="bg-gray-100 rounded-[20px] w-[500px] min-h-[500px] max-h-[500px] gap-[10px] flex flex-col pt-[1px] px-5 overflow-y-scroll">
            {clientDetails?.notes?.map((item: Note, index: number) => (
              <div
                className="flex shadow-xl justify-between mt-5 w-[99%] bg-blue-100 border border-b-gray-300 h-auto p-10"
                key={index}
              >
                <span className="ml-[15px]"> {item.note}</span>
              </div>
            ))}
          </div>
        </div>
        <div className=" w-[500px] h-[500px] absolute right-10">
          <div className="w-full justify-between flex px-4">
            {" "}
            <h2 className="text-[25px] font-semibold text-gray-800">
              Schedules
            </h2>
            <button
              className="hover:brightness-50"
              onClick={() => setShowCreateScheduleModal(true)}
            >
              <FaPlusSquare color={"#2A64DB"} size={25} />
            </button>
          </div>
          <div className="bg-gray-100 w-[500px] h-[500px] pt-10 flex flex-col  gap-5 rounded-[20px]">
            {clientDetails?.schedules?.map((item: Schedule, index: number) => (
              <div
                className="flex p-[10px] justify-between shadow-lg w-[99%] rounded-md border bg-blue-100  border-gray-100 px-10"
                key={index}
              >
                <span className="ml-[15px] font-semibold text-gray-600">
                  {" "}
                  {item.description}
                </span>
                <p className="text-[18px] text-gray-950" key={index}>
                  {new Date(item.date).toLocaleDateString() ?? ""}
                </p>
              </div>
            ))}
          </div>
        </div>
        {showCreateScheduleModal ? (
          <Modal closeModal={setShowCreateScheduleModal}>
            <ClientsSchedules
              setData={setData}
              data={data}
              client={clientDetails}
              setShowCreateScheduleModal={setShowCreateScheduleModal}
            />
          </Modal>
        ) : null}

        {showCreateNoteModal ? (
          <ClientsNotesModal
            setData={setData}
            data={data}
            client={clientDetails}
            setShowCreateNoteModal={setShowCreateNoteModal}
          />
        ) : null}
        {showDeleteModal ? (
          <ClientConfirmDeleteModal
            deleteModal={removeSelectedClient}
            setShowDeleteModal={setShowDeleteModal}
          />
        ) : null}
      </div>
    </Modal>
  );
};

export default ClientDetailsModal;
