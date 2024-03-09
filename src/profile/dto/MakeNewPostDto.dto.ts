import { IsNotEmpty } from 'class-validator';

export class MakeNewPostDto {
  userId: number;

  @IsNotEmpty()
  newPost: {
    text: string;
    picture: string | null;
  };
}
