import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { prisma } from 'prisma/prisma';

@Injectable()
export class SignUpEmailValidation implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const email = request.body.user.email;
    if (!email) throw new BadRequestException('Email is not provided');

    const user = await prisma.users.findFirst({ where: { email } });
    if (user)
      throw new BadRequestException('User with this email already exists');

    return true;
  }
}
