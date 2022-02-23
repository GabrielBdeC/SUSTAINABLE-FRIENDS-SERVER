export interface UserDto {
  name: string;
  email: string;
  password: string | undefined;
  identifier: string;
  jwt: string | undefined;
}
