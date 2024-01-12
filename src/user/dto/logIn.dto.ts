import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LogInDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(8)
  password: string;
}
