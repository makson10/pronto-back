import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserUtilsService } from './userUtils.service';

@Module({
  providers: [UserService, UserUtilsService],
  controllers: [UserController],
})
export class UserModule {}
