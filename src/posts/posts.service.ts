import { Injectable } from '@nestjs/common';
import { prisma } from 'prisma/prisma';
import { Post } from './interfaces/post.interfaces';

@Injectable()
export class PostsService {
  public async getPost(postId: number) {
    return await prisma.posts.findFirst({
      where: { postId },
    });
  }

  public async getPosts(authorId: number) {
    return await prisma.posts.findMany({
      where: { authorId },
      orderBy: { createdAt: 'desc' },
    });
  }

  public async addPost(newPost: Post) {
    return await prisma.posts.create({
      data: { ...newPost },
    });
  }

  public async getPostData(postId: number) {
    return await prisma.posts.findFirst({ where: { postId } });
  }

  public async deletePost(postId: number) {
    const { authorId } = await this.getPostData(postId);

    return await prisma.posts.delete({
      where: { authorId_postId: { authorId, postId } },
    });
  }
}
