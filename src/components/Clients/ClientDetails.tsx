import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaBuilding, FaEnvelope, FaPhone, FaWindowClose } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

interface ClientDetailsProps {
  clientDetails: Client;
  setClientDetails: (value: boolean) => void;
  showClientModal: boolean;
  setShowClientModal: (value: boolean) => void;
}
const ClientDetails: React.FC<ClientDetailsProps> = ({
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

  //useEffect(() => console.log("Clients", data));

  return (
    <div className="fixed w-[1200px] p-10 bg-gray-100 rounded-[20px] h-[700px]">
      <button onClick={() => setShowClientModal(false)}>
        <FaXmark className="absolute top-10 right-10" />
      </button>
      <div className="flex gap-10 mt-5 flex-col">
        <div className="flex gap-10">
          <div>
            <span className="font-normal">First name</span>
            <h4 className="text-[35px] font-semibold">
              {clientDetails.firstName}
            </h4>
          </div>
          <div>
            <span className="font-normal">Last name</span>
            <h4 className="text-[35px] font-semibold">
              {clientDetails.lastName}
            </h4>
          </div>
        </div>
        <div className="flex gap-10">
          <div className="flex gap-2 items-center">
            <FaEnvelope style={{ color: "#2A64DB" }} />
            <h4>{clientDetails.email}</h4>
          </div>
          <div className="flex gap-2 items-center">
            <FaPhone style={{ color: "#2A64DB" }} />
            <h4>{clientDetails.phone}</h4>
          </div>
          <div className="flex gap-2 items-center">
            <FaBuilding style={{ color: "#2A64DB" }} />
            <h4>{clientDetails.company}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
