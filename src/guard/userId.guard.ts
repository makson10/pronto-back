import {
  Injectable,
  ExecutionContext,
  CanActivate,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { prisma } from 'prisma/prisma';

@Injectable()
export class UserIdGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const userId = request.body.userId;
    if (!userId) throw new BadRequestException('No user id provided');

    const parsedUserId = parseInt(userId);
    const user = await prisma.users.findFirst({ where: { id: parsedUserId } });
    if (!user) throw new UnauthorizedException('No user with this user ID');

    return true;
  }
}
