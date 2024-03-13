import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { Response } from 'express';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get(':userId')
  async getPosts(
    @Param('userId', ParseIntPipe) userId: number,
    @Res() res: Response,
  ) {
    const posts = await this.postsService.getPosts(userId);
    res.status(200).json({ posts });
  }
}
