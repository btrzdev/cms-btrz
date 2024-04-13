/* eslint-disable react/jsx-key */
"use client";
import CreateNewClient from "@/components/Clients/CreateNewClient";
import { COLUMNS } from "@/components/Dashboard/Columns";
import { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { FaEye, FaSearch } from "react-icons/fa";
import ClientDetailsModal from "@/components/Clients/ClientDetailsModal";
import Logo from "@/components/Logo";
import Link from "next/link";
import { useRouter } from "next/router";

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
  const [clientDetails, setClientDetails] = useState<
    Client | null | [x: string] | {}
  >();
  const [showClientModal, setShowClientModal] = useState(false);

  const router = useRouter();

  const openModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    const tokenStorage = sessionStorage.getItem("token");
    console.log("token", tokenStorage);
    if (tokenStorage === "" || tokenStorage === null) {
      router.push("/");
    }
  }, []);

  const columns = useMemo(() => {
    return [
      ...COLUMNS,
      {
        Header: "",
        accessor: "actions",
        Cell: ({ row }) => (
          <button
            onClick={() => {
              setClientDetails(row.original);
              setShowClientModal(true);
            }}
            className="flex items-center gap-2 text-blue-500 hover:brightness-50"
          >
            <FaEye /> Details
          </button>
        ),
      },
    ];
  }, []);

  const [search, setSearch] = useState("");

  const handleSearch = (event: any) => {
    setSearch(event.target.value);
  };
  const filteredData = data.filter((item: Client) =>
    item.firstName.toLowerCase().includes(search.toLowerCase())
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: filteredData });

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center`}>
      <div className="w-full h-[80px] bg-blue-600 absolute top-0 pl-10 pt-5">
        <Link href={"/"}>
          <Logo iconWidth={50} textSize={25} />
        </Link>
      </div>
      <div className="flex gap-5">
        <FaSearch />
        <input id="search" type="text" onChange={handleSearch} />
      </div>

      <button
        type="button"
        onClick={() => openModal()}
        className="w-[200px] hover:brightness-75 absolute top-[100px] right-20 text-white font-semibold text-md h-[40px] rounded-md bg-gradient-to-r  bg-green-600"
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
      {showClientModal && (
        <ClientDetailsModal
          showClientModal={showClientModal}
          setShowClientModal={setShowClientModal}
          clientDetails={clientDetails}
          setClientDetails={setClientDetails}
          data={data}
          setData={setData}
        />
      )}
      <div className="container absolute top-[200px]">
        <div className="w-full px-4">
          <table {...getTableProps()} className="table-auto w-full">
            <thead className="bg-blue-600">
              {headerGroups.map((headerGroup) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  className="bg-blue-600 text-left"
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="w-1/6  min-w-[160px] text-lg font-semibold text-white
                      py-4 lg:py-7 px-3 lg:px-4 border-l border-transparent"
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
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="text-left text-dark
                        font-medium
                        text-base
                        py-5
                        px-2
                        bg-[#F3F6FF]
                        border-b border-l border-[#E8E8E8]"
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
