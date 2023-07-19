export interface UserDto {
  _id?: string;

  username: string;

  profileURL: string;

  phone?: number;

  country: string;

  email: string;

  password: string;

  roles: string[];
}
