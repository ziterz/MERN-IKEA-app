import IProduct from "./IProduct";
import IUser from "./IUser";

export default interface IOrder {
  user: IUser;
  items: [
    {
      product: IProduct;
      quantity: number;
    },
  ];
  totalPrice: number;
  status: string;
  createdAt: Date;
}
