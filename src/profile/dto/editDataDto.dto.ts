import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class EditDataDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  newProfileData: {
    dateOfBirth: string;
    description: string;
    city: string;
  };
}
