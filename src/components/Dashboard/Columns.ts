import { Column } from "react-table";

export const COLUMNS: Column<{
  firstName: string;
  lastName: string;
  email: string;
}>[] = [
  {
    Header: "First Name",
    accessor: "firstName",
  },
  {
    Header: "Last Name",
    accessor: "lastName",
  },
  {
    Header: "Email",
    accessor: "email",
  },
];
