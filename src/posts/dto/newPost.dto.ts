import { IsNotEmpty } from 'class-validator';

export class NewPostDto {
  postId: number;
  authorId: number;
  createdAt: string;

  @IsNotEmpty()
  text: string;

  picture: string | null;
}
