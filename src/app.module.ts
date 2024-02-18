import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [UserModule, ProfileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
