import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserUtilsService } from './userUtils.service';
import { ProfileService } from '../profile/profile.service';

@Module({
  providers: [UserService, UserUtilsService, ProfileService],
  controllers: [UserController],
})
export class UserModule {}
