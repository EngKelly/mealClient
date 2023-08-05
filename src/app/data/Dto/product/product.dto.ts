export interface ProductDto {
  _id: string;

  title: string;

  desc: string;

  img: string;

  categories: string[];

  price: number;

  InStock: boolean;
}
