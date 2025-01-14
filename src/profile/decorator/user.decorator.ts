import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserUtilsService } from 'src/user/userUtils.service';

export const User = createParamDecorator(
  async (data: string, ctx: ExecutionContext) => {
    const userUtilsService = new UserUtilsService();
    const request = ctx.switchToHttp().getRequest();
    const userId = request.body.userId;

    const user = await userUtilsService.findUserByUserId(userId);
    return user;
  },
);
