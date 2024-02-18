import { Injectable, UnauthorizedException } from '@nestjs/common';
import { prisma } from 'prisma/prisma';
import { UserUtilsService } from 'src/user/userUtils.service';

@Injectable()
export class ProfileService {
  constructor(private userUtilsService: UserUtilsService) {}

  public async getProfile(userId: number) {
    return await prisma.profile.findUnique({
      where: { profileId: userId },
    });
  }

  public async updateProfile(userId: number, newProfileData: any) {
    return await prisma.profile.update({
      where: { profileId: userId },
      data: { ...newProfileData },
    });
  }

  public async addUserToVerificationRequestList(userId: number) {
    return await prisma.verificationRequest.create({ data: { userId } });
  }

  public async resetVerificationData() {
    return await prisma.profile.updateMany({
      data: { sentVerificationRequest: false },
    });
  }

  public async comparePasswordWithStored(userId: number, oldPassword: string) {
    const user = await this.userUtilsService.findUserByUserId(userId);
    if (!user)
      throw new UnauthorizedException('User with this user id did not found');

    const isPasswordValid = await this.userUtilsService.verifyUserPassword(
      oldPassword,
      user.password,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException(
        'Entered password does not match with stored',
      );
  }
}
