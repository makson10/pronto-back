import { IsNotEmpty, Length } from 'class-validator';

export class ChangePasswordDto {
  userId: number;

  @IsNotEmpty()
  @Length(8)
  oldPassword: string;

  @IsNotEmpty()
  @Length(8)
  newPassword: string;
}
