import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class NewPostDto {
  @ApiProperty()
  authorId: number;

  @ApiProperty()
  postId: number;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  @IsNotEmpty()
  text: string;

  @ApiProperty()
  picture: string | null;
}
