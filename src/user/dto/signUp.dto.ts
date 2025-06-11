import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class SignUpDto {
  @ApiProperty()
  @IsNotEmpty()
  @Length(2)
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(2)
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(8)
  password: string;
}
