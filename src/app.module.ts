import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserProfileModule } from './userProfile/userProfile.module';

@Module({
  imports: [UserModule, UserProfileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
