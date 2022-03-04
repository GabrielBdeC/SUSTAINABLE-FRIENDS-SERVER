import { BaseDto } from '../../../shared/dtos/base.dto';

export interface UserDto extends BaseDto {
  name: string;
  email: string | undefined;
  password: string | undefined;
  cnpj: string | undefined;
  cpf: string | undefined;
}
