import { ProductCartDto } from './productCart.dto';
import { UserCartDto } from './userCart.dto';

export interface CartDto {
  _id?: string;
  user: UserCartDto;

  product: ProductCartDto;

  quantity: number;
}
