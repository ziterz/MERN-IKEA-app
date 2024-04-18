import IProduct from "./IProduct";
import IUser from "./IUser";

export default interface ICart {
  user: IUser;
  items: [
    {
      product: IProduct;
      quantity: number;
    },
  ];
}
