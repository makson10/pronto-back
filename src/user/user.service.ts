import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LogInData, SignUpData } from './interfaces/user.interfaces';
import { UserUtilsService } from './userUtils.service';
import { ProfileService } from '../profile/profile.service';
import { prisma } from 'prisma/prisma';

@Injectable()
export class UserService {
  constructor(
    private userUtilsService: UserUtilsService,
    private profileService: ProfileService,
  ) {}

  public async createNewUserSession(sessionId: string, userId: number) {
    const sessionExpireDate = new Date(+new Date() + 28 * 24 * 60 * 60 * 1000);
    const session = {
      sessionId: sessionId,
      userId: userId,
      expiresAt: sessionExpireDate,
    };

    await this.userUtilsService.deleteAllUserSession(userId);
    await this.userUtilsService.storeNewSessionInDB(session);
  }

  public async signUp(user: SignUpData) {
    const { firstName, lastName, email, password } = user;

    const id = this.userUtilsService.generateUniqueId();
    const fullName = this.userUtilsService.combineName(firstName, lastName);
    const hashedPassword =
      await this.userUtilsService.hashingPassword(password);

    const newUser = { id, ...user, fullName, password: hashedPassword };
    const sessionUserData = { id, firstName, email };

    try {
      const createdUser = await prisma.users.create({
        data: {
          ...newUser,
          Profiles: {
            create: { presents: [] },
          },
        },
      });
      return { okay: true, sessionUserData, createdUser };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('While sign up happened error');
    }
  }

  public async logIn(user: LogInData) {
    const foundUser = await this.userUtilsService.verifyUser(user);

    const sessionUserData = {
      id: foundUser.id,
      email: foundUser.email,
      firstName: foundUser.firstName,
    };

    return {
      isAuthorized: true,
      sessionUserData,
      foundUser,
    };
  }

  public async logOut(userId: number) {
    await this.userUtilsService.deleteAllUserSession(userId);
  }

  public async getUserData(userId: number) {
    return await this.userUtilsService.findUserByUserId(userId);
  }

  public async getUserIconById(companionId: number) {
    const companionProfile = await this.profileService.getProfile(companionId);
    return companionProfile.icon;
  }

  public async deleteExpiredSessions() {
    await this.userUtilsService.deleteExpiredSessions();
  }
}
