export interface UserDto {
  _id?: string;

  username: string;

  phone?: number;

  country: string;

  email: string;

  password: string;

  roles: string[];
}
