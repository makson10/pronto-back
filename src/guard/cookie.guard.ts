import {
  Injectable,
  ExecutionContext,
  CanActivate,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class CookieGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const requestCookie = request.cookies;
    const sessionId = requestCookie.sessionId;

    if (!sessionId) throw new BadRequestException('Session ID is not valid');
    return true;
  }
}
