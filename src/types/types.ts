type Credentials = {
  email: string;
  password: string;
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
  notes: string[];
  company?: string;
  schedules?: Date[];
};
