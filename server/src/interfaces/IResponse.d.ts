export interface IUserRegisterResponse {
  message: string;
  user: {
    firstName: string;
    lastName: string;
    address: string;
    postalCode: string;
    phoneNumber: string;
    email: string;
    role: string;
  };
}

export interface IUserLoginResponse {
  message: string;
  user: {
    firstName: string;
    lastName: string;
    address: string;
    postalCode: string;
    phoneNumber: string;
    email: string;
    role: string;
  };
}
