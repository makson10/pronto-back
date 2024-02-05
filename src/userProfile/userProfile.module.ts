import { Module } from '@nestjs/common';
import { UserProfileController } from './userProfile.controller';
import { UserProfileService } from './userProfile.service';

@Module({
  providers: [UserProfileService],
  controllers: [UserProfileController],
})
export class UserProfileModule {}
