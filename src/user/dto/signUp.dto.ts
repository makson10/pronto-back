import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @Length(2)
  firstName: string;

  @IsNotEmpty()
  @Length(2)
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8)
  password: string;
}
