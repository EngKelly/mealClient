export interface ProductDto {
  _id: string;

  title: string;

  desc: string;

  img: string;

  categories: string[];

  size: string[];

  color: string[];

  price: number;

  InStock: boolean;
}
