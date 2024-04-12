export interface IUserRegisterRequest {
  firstName: string;
  lastName: string;
  address: string;
  postalCode: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

export interface IUserLoginRequest {
  email: string;
  password: string;
}
