import {
  Injectable,
  ExecutionContext,
  CanActivate,
  BadRequestException,
} from '@nestjs/common';
import { prisma } from 'prisma/prisma';

@Injectable()
export class SessionGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const sessionId = request.cookies.sessionId;

    const session = await prisma.session.findFirst({ where: { sessionId } });
    if (!session) {
      throw new BadRequestException('No session with this session ID');
    }

    return true;
  }
}
