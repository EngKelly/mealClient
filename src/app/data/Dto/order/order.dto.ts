import { ProductStatus } from '../../enum/product-status';
import { ProductDto } from '../product/product.dto';

export interface OrderDto {
  _id?: string;

  userId: string;

  product: {
    productId: string;
    product: ProductDto;
    quantity: number;
  };

  amount: number;

  address: string;

  status: ProductStatus;
}
