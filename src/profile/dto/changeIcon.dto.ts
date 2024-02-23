import { IsNotEmpty } from 'class-validator';

export class ChangeIconDto {
  userId: number;

  @IsNotEmpty()
  newIconUrl: string;
}
