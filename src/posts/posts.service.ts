import { Injectable } from '@nestjs/common';
import { prisma } from 'prisma/prisma';

@Injectable()
export class PostsService {
  public async getPosts(userId: number) {
    return await prisma.posts.findMany({ where: { authorId: userId } });
  }
}
