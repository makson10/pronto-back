import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ChangeIconDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  newIconUrl: string;
}
