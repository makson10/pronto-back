import { Injectable } from '@nestjs/common';
import { prisma } from 'prisma/prisma';

@Injectable()
export class UserProfileService {
  public async getUserProfile(userId: number) {
    return await prisma.userProfile.findUnique({
      where: { profileId: userId },
    });
  }
}
