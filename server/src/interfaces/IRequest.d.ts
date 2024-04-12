export interface IUserRegisterRequest {
  firstName: string;
  lastName: string;
  address: string;
  postalCode: number;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}
