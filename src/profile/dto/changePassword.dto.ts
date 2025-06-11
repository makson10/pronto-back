import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @Length(8)
  oldPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(8)
  newPassword: string;
}
