import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface ClientDetailsProps {
  data: Client;
  clientDetails: boolean;
  setClientDetails: (value: boolean) => void;
}
const ClientDetails: React.FC<ClientDetailsProps> = ({ data }) => {
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

  //useEffect(() => console.log("Clients", data));

  return (
    <div className="fixed w-[600px] p-10 bg-gray-200 rounded-md">
      <h4>Nome da pessoa</h4>
    </div>
  );
};

export default ClientDetails;
