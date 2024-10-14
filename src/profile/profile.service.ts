import { Injectable, UnauthorizedException } from '@nestjs/common';
import { prisma } from 'prisma/prisma';
import { UserUtilsService } from 'src/user/userUtils.service';
import { NewProfileData, Post } from './interfaces/profile.interfaces';

@Injectable()
export class ProfileService {
  constructor(private userUtilsService: UserUtilsService) {}

  public async getProfile(userId: number) {
    return await prisma.profiles.findUnique({
      where: { profileId: userId },
    });
  }

  public async updateProfile(userId: number, newProfileData: any) {
    return await prisma.profiles.update({
      where: { profileId: userId },
      data: { ...newProfileData },
    });
  }

  public async addUserToVerificationRequestList(userId: number) {
    return await prisma.verificationRequests.create({ data: { userId } });
  }

  public async resetVerificationData() {
    return await prisma.profiles.updateMany({
      data: { sentVerificationRequest: false },
    });
  }

  public async comparePasswordWithStored(
    oldPassword: string,
    storedPassword: string,
  ) {
    const isPasswordValid = await this.userUtilsService.verifyUserPassword(
      oldPassword,
      storedPassword,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException('Old password does not match');
  }

  public async changeUserPassword(userId: number, newPassword: string) {
    const hashedNewPassword =
      await this.userUtilsService.hashingPassword(newPassword);

    return await prisma.users.update({
      where: { id: userId },
      data: { password: hashedNewPassword },
    });
  }

  public async changeUserIcon(userId: number, newIconUrl: string) {
    return await prisma.profiles.update({
      where: { profileId: userId },
      data: { icon: newIconUrl },
    });
  }

  public async deleteIcon(userId: number) {
    return prisma.profiles.update({
      where: { profileId: userId },
      data: { icon: null },
    });
  }

  public async editData(userId: number, newProfileData: NewProfileData) {
    const age = await this.calculateUserAge(newProfileData.dateOfBirth);

    return prisma.profiles.update({
      where: { profileId: userId },
      data: { ...newProfileData, age },
    });
  }

  private async calculateUserAge(dateOfBirth: string) {
    const timeDifference = Date.now() - +new Date(dateOfBirth);
    return Math.floor(timeDifference / 1000 / 60 / 60 / 24 / 365);
  }

  public async getUserChats(userId: number) {
    return await prisma.profiles.findUnique({
      where: { profileId: userId },
      select: { chats: true },
    });
  }
}
