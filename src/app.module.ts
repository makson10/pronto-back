import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { PostsModule } from './posts/posts.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [UserModule, ProfileModule, PostsModule, ChatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
