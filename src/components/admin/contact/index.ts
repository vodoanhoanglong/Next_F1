import AdminContact from "./AdminContact";

export { AdminContact };

export interface IContactData {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  metadata: {
    message: string;
  };
}
