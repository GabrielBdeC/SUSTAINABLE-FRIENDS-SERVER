import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { IPreferences } from '../constants/preferences.constant';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Name value must not be empty. Please provide a name.',
  })
  @IsString({ message: 'Name value must be a string.' })
  @Length(1, 84)
  name: string;

  @IsNotEmpty({
    message: 'Email value must not be empty. Please provide an email.',
  })
  @IsString({ message: 'Email value must be a string.' })
  @Length(6, 84)
  @IsEmail({ message: 'Provide a proper email.' })
  email: string;

  @IsNotEmpty({
    message: 'Password value must not be empty. Please provide an password;.',
  })
  @IsString({ message: 'Password value must be a string.' })
  @Length(8, 128)
  password: string;

  @ValidateNested({ message: 'It is missing the items property.' })
  @Type(() => IPreferences)
  @IsNotEmpty({ message: 'Preferences value must not be empty.' })
  preferences: IPreferences;

  @IsNotEmpty({
    message: 'CNPJ value must not be empty. Please provide an CNPJ;.',
  })
  @IsString({ message: 'CNPJ value must be a string.' })
  @IsOptional()
  cnpj?: string;

  @IsNotEmpty({
    message: 'CPF value must not be empty. Please provide an CPF;.',
  })
  @IsString({ message: 'CPF value must be a string.' })
  @IsOptional()
  cpf?: string;
}
