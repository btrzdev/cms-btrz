/* eslint-disable react/jsx-key */
import CreateNewClient from "@/components/Clients/CreateNewClient";
import { COLUMNS } from "@/components/Dashboard/Columns";
import { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { FaEye, FaSearch, FaSignOutAlt } from "react-icons/fa";
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
  const [clientDetails, setClientDetails] = useState<Client>();
  const [showClientModal, setShowClientModal] = useState(false);
  const [loader, setLoader] = useState(true);
  const [username, setUsername] = useState("");

  const router = useRouter();

  const openModal = () => {
    setShowModal(true);
  };

  function parseJwt(token: string) {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  }

  useEffect(() => {
    const tokenStorage = sessionStorage.getItem("token");
    if (tokenStorage === "" || tokenStorage === null) {
      router.push("/");
    }
    const userInfo = parseJwt(String(tokenStorage));
    setUsername(userInfo.firstName);
  }, []);

  useEffect(() => {
    setLoader(false);
  }, []);

  const columns = useMemo(() => {
    return [
      ...COLUMNS,
      {
        Header: "",
        accessor: "actions" as const,
        Cell: ({ row }: any) => (
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
  if (loader) {
    return <p>Loading...</p>;
  }

  const logout = () => {
    sessionStorage.clear();
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center`}>
      <div className="w-full h-[80px] bg-blue-600 absolute top-0 pt-5 flex justify-between px-10 items-center pb-5">
        <Link href={"/"}>
          <Logo iconWidth={50} textSize={25} />
        </Link>
        <div className="flex text-white gap-2">
          <span>Welcome,</span>{" "}
          <span className="font-semibold">{username}</span>
          <button onClick={() => logout()}>
            <a
              href="#"
              className="text-primary dark:text-primary-400"
              data-twe-toggle="tooltip"
              title="Click to logout"
            >
              <FaSignOutAlt color={"#ffff"} size={25} />
            </a>
          </button>
        </div>
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
      {showClientModal && clientDetails && (
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
        <div className="bg-gray-100 p-2">
          <div className="w-full p-2">
            <div className="flex gap-5 mb-4 items-center">
              <FaSearch />
              <input
                id="search"
                placeholder="Search by name"
                type="text"
                onChange={handleSearch}
                className="p-2"
              />
            </div>
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
                            className="text-left text-dark font-medium text-base py-5 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]"
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
      </div>
    </main>
  );
}
