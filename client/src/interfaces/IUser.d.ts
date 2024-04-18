export default interface IUser {
  firstName: string;
  lastName: string;
  address: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: string | "user" | "admin";
}
