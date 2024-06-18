import { IsNotEmpty } from 'class-validator';

export class NewPostDto {
  authorId: number;
  createdAt: string;

  @IsNotEmpty()
  text: string;

  picture: string | null;
}
