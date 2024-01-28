import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserUtilsService } from '../userUtils.service';

export const UserSession = createParamDecorator(
  async (data: string, ctx: ExecutionContext) => {
    const { findSessionBySessionId } = new UserUtilsService();
    const request = ctx.switchToHttp().getRequest();

    const sessionId = request.cookies.sessiodId;
    const session = await findSessionBySessionId(sessionId);

    return session;
  },
);
