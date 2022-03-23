import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginUserDto {
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
}
