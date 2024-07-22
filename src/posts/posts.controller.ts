import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { PostsService } from './posts.service';
import { NewPostDto } from './dto/newPost.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get(':authorId')
  async getPosts(
    @Param('authorId', ParseIntPipe) authorId: number,
    @Res() res: Response,
  ) {
    const posts = await this.postsService.getPosts(authorId);
    res.status(200).json(posts);
  }

  @Post('/addpost')
  async addPost(@Body() newPost: NewPostDto, @Res() res: Response) {
    await this.postsService.addPost(newPost);
    res.status(200).json({ okay: true });
  }

  @Post('/deletepost')
  async deletePost(
    @Body('postId', ParseIntPipe) postId: number,
    @Res() res: Response,
  ) {
    await this.postsService.deletePost(postId);
    res.status(200).json({ okay: true });
  }
}
