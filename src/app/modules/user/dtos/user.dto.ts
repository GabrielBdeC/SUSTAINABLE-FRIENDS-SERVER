import { BaseDto } from '../../../shared/dtos/base.dto';
import { IPreferences } from '../constants/preferences.constant';

export interface UserDto extends BaseDto {
  name: string;
  email: string | undefined;
  password: string | undefined;
  preferences: IPreferences | undefined;
  cnpj: string | undefined;
  cpf: string | undefined;
  isPersonal?: boolean;
}
