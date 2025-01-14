import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { UserUtilsService } from '../user/userUtils.service';

@Module({
  providers: [ProfileService, UserUtilsService],
  controllers: [ProfileController],
})
export class ProfileModule {}
