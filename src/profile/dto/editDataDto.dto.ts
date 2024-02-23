import { IsNotEmpty } from 'class-validator';

export class EditDataDto {
  userId: number;

  @IsNotEmpty()
  newProfileData: {
    dateOfBirth: string;
    description: string;
    city: string;
  };
}
