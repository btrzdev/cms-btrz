import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaBuilding,
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaPlusSquare,
  FaWindowClose,
} from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { createClient } from "./Clients";
import EditClientDetails from "./EditClientDetails";
import Modal from "../Modal/Modal";
import ClientsSchedules from "./ClientSchedules";

interface ClientDetailsProps {
  data: Client[];
  setData: (value: Client[]) => void;
  clientDetails: any;
  setClientDetails: (value: Client | null | undefined) => void;
  showClientModal: boolean;
  setShowClientModal: (value: boolean) => void;
}
const ClientDetails: React.FC<ClientDetailsProps> = ({
  data,
  setData,
  clientDetails,
  setClientDetails,
  showClientModal,
  setShowClientModal,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Client>();

  //useEffect(() => console.log("Clients", data));
  const [showEditClientModal, setShowEditClientModal] = useState(false);
  const [showCreateScheduleModal, setShowCreateScheduleModal] = useState(false);

  const removeSelectedClient = async () => {
    const getItemToRemoveItem = data.filter(
      (item: Client) => item.email !== clientDetails?.email
    );
    //console.log("To remove", getItemToRemoveItem);
    setData(getItemToRemoveItem);
    createClient(getItemToRemoveItem);

    setShowClientModal(false);
  };

  return (
    <Modal closeModal={setShowClientModal}>
      <div className="w-[1200px] h-[800px]">
        <button
          type="button"
          onClick={() => setShowEditClientModal(true)}
          className="w-[200px] hover:brightness-75 absolute bottom-5 right-20 text-white font-semibold text-md h-[40px] rounded-md bg-gradient-to-r  bg-blue-500"
        >
          {" "}
          Edit client
        </button>
        <button
          type="button"
          onClick={() => removeSelectedClient()}
          className="w-[200px] hover:brightness-75 absolute bottom-20 right-20 text-white font-semibold text-md h-[40px] rounded-md bg-gradient-to-r  bg-red-600"
        >
          {" "}
          Delete client{" "}
        </button>

        <div className="flex gap-10 mt-5 flex-col">
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
          </div>
          <div className="flex gap-10">
            <div className="flex gap-2 items-center">
              <FaEnvelope style={{ color: "#2A64DB" }} size={25} />
              <h4>{clientDetails?.email}</h4>
            </div>
            <div className="flex gap-2 items-center">
              <FaPhone style={{ color: "#2A64DB" }} size={25} />
              <h4>{clientDetails?.phone}</h4>
            </div>
            <div className="flex gap-2 items-center">
              <FaBuilding style={{ color: "#2A64DB" }} size={25} />
              <h4>{clientDetails?.company}</h4>
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
          <div className="bg-gray-200 w-[500px] h-[500px] rounded-[20px]"></div>
        </div>
        {showCreateScheduleModal ? (
          <Modal closeModal={setShowCreateScheduleModal}>
            <ClientsSchedules data={data} client={clientDetails} />
          </Modal>
        ) : null}
      </div>
    </Modal>
  );
};

export default ClientDetails;
