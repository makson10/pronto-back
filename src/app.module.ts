import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [UserModule, ProfileModule, PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
