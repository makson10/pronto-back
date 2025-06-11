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
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiOperation({ summary: 'Get post by post ID' })
  @ApiOkResponse({ description: 'Post retrieved successfully' })
  @ApiBadRequestResponse({ description: 'Error retrieving post' })
  @ApiBody({ type: Number })
  @Get(':postId')
  async getPost(
    @Param('postId', ParseIntPipe) postId: number,
    @Res() res: Response,
  ) {
    const post = await this.postsService.getPost(postId);
    res.status(200).json(post);
  }

  @ApiOperation({ summary: 'Get posts by author ID' })
  @ApiOkResponse({ description: 'Posts retrieved successfully' })
  @ApiBadRequestResponse({ description: 'Error retrieving posts' })
  @ApiBody({ type: Number })
  @Get('/author/:authorId')
  async getPosts(
    @Param('authorId', ParseIntPipe) authorId: number,
    @Res() res: Response,
  ) {
    const posts = await this.postsService.getPosts(authorId);
    res.status(200).json(posts);
  }

  @ApiOperation({ summary: 'Add post' })
  @ApiOkResponse({ description: 'Post added successfully' })
  @ApiBadRequestResponse({ description: 'Error adding post' })
  @ApiBody({ type: NewPostDto })
  @Post('/addpost')
  async addPost(@Body() newPost: NewPostDto, @Res() res: Response) {
    await this.postsService.addPost(newPost);
    res.status(200).json({ okay: true });
  }

  @ApiOperation({ summary: 'Delete post' })
  @ApiOkResponse({ description: 'Post deleted successfully' })
  @ApiBadRequestResponse({ description: 'Error deleting post' })
  @ApiBody({ type: Number })
  @Post('/deletepost')
  async deletePost(
    @Body('postId', ParseIntPipe) postId: number,
    @Res() res: Response,
  ) {
    await this.postsService.deletePost(postId);
    res.status(200).json({ okay: true });
  }
}
