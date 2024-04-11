/* eslint-disable react/jsx-key */
import CreateNewClient from "@/components/Clients/CreateNewClient";
import { COLUMNS } from "@/components/Dashboard/Columns";
import { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { FaEye } from "react-icons/fa";
import ClientDetails from "@/components/Clients/ClientDetails";

export default function Dashboard() {
  let localStorageLoaded;
  if (typeof window !== "undefined") {
    localStorageLoaded = localStorage;
  } else {
    localStorageLoaded = null;
  }
  const localStorageData = localStorageLoaded?.getItem("data");
  const initialData = localStorageData ? JSON.parse(localStorageData) : [];

  const [data, setData] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [clientDetails, setClientDetails] = useState();

  const openModal = () => {
    setShowModal(true);
  };

  console.log("client", clientDetails);

  const columns = useMemo(() => COLUMNS, []);
  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center`}>
      <button
        type="button"
        onClick={() => openModal()}
        className="w-[200px] hover:brightness-75 absolute top-20 right-20 text-white font-semibold text-md h-[40px] rounded-md bg-gradient-to-r  bg-green-600"
      >
        {" "}
        Add Client +{" "}
      </button>
      {showModal && (
        <CreateNewClient
          setShowModal={setShowModal}
          data={data}
          setData={setData}
        />
      )}
      {clientDetails && (
        <ClientDetails
          clientDetails={clientDetails}
          data={data[0]}
          setClientDetails={setClientDetails}
        />
      )}
      <div className="w-[1000px] text-[24px] rounded-md border-gray-300 p-[20px] border ">
        <table
          {...getTableProps()}
          className="border-solid border-[#eaecf0] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] overflow-hidden bg-white flex flex-col pb-4 gap-3 itens-center border rounded-lg"
        >
          <thead className="pl-[10px] border-solid bg-blue-300 border-[#eaecf0] flex flex-col justify-center items-start border-t-0 border-b py-[10px] align-middle">
            {headerGroups.map((headerGroup) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                className="bg-white flex flex-row items-start mx-0"
              >
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className={`border-solid bg-blue-300 break-normal border-[#eaecf0] flex flex-col min-w-[110px] max-w-[100px] md:min-w-[125px] md:max-w-[130px] lg:min-w-[150px] xl:max-w-[230px] xl:min-w-[190px] justify-start min-h-[40px] h-content items-start p-0 border-t-0  border-x-0 p`}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="bg-white flex flex-row items-start mx-0 h-[100px] border-b border-gray-300 pt-[10px]"
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className={
                          "border-solid pl-5 text-gray-900 min-w-[110px] md:mx-1 md:max-w-[130px] lg:min-w-[140px] xl:max-w-[180px] border-[#eaecf0] xl:min-w-[180px]  flex flex-col justify-start max-w-[100px] min-h-[40px] h-auto items-start p-0 border-t-0  border-x-0"
                        }
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                  <td>
                    <button
                      onClick={() => setClientDetails(row.original)}
                      className="flex items-center gap-2 hover:text-blue-500"
                    >
                      <FaEye /> Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
