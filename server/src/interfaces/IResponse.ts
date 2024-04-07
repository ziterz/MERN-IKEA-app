export interface IUserRegisterResponse {
  message: string;
  user: {
    firstName: string;
    lastName: string;
    address: string;
    postalCode: number;
    phoneNumber: string;
    email: string;
    role: string;
  };
}
