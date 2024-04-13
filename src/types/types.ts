type Credentials = {
  email: string;
  password: string;
};

type Schedule = {
  description: string;
  date: Date;
};

type Note = {
  note: string;
};

type CreateUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  securePasswordFlag: boolean;
};

type Client = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  notes: Note[];
  company?: string;
  schedules?: Schedule[];
};
