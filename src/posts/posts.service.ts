import { Injectable } from '@nestjs/common';
import { prisma } from 'prisma/prisma';
import { Post } from './interfaces/post.interfaces';

@Injectable()
export class PostsService {
  public async getPosts(authorId: number) {
    return await prisma.posts.findMany({ where: { authorId } });
  }

  public async addPost(newPost: Post) {
    return await prisma.posts.create({
      data: { ...newPost },
    });
  }
}
