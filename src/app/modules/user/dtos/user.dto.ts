export interface UserDto {
  name: string;
  email: string | undefined;
  password: string | undefined;
  identifier: string;
  cnpj: string | undefined;
}
