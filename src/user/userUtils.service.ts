import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LogInData, Session } from './interfaces/user.interfaces';
import { prisma } from 'prisma/prisma';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserUtilsService {
  private readonly ID_LENGTH = 8;

  public getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  }

  public generateUniqueId() {
    let id = '';

    id += this.getRandomNumber(1, 9);
    for (let i = 0; i < this.ID_LENGTH - 1; i++) {
      id += this.getRandomNumber(0, 9);
    }

    return parseInt(id);
  }

  public async hashingPassword(plainPassword: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(plainPassword, salt);
  }

  public combineName(firstName: string, lastName: string) {
    firstName = firstName[0].toUpperCase() + firstName.slice(1);
    lastName = firstName[0].toUpperCase() + firstName.slice(1);
    return firstName + ' ' + lastName;
  }

  public async findUserByEmail(email: string) {
    return await prisma.user.findFirst({ where: { email } });
  }

  public async findUserByUserId(id: number) {
    return await prisma.user.findFirst({ where: { id } });
  }

  public async findSessionBySessionId(sessionId: string) {
    return await prisma.session.findFirst({ where: { sessionId } });
  }

  public async verifyUser(user: LogInData) {
    const { email: enteredEmail, password: enteredPassword } = user;
    const foundUser = await this.findUserByEmail(enteredEmail);
    if (!foundUser)
      throw new UnauthorizedException("User with this email didn't find");

    const haveAccess = await this.verifyUserPassword(
      enteredPassword,
      foundUser.password,
    );
    if (!haveAccess) throw new UnauthorizedException("Password doesn't match");

    return foundUser;
  }

  public async verifyUserPassword(
    enteredPassword: string,
    stroredHashedPassword: string,
  ) {
    return await bcrypt.compare(enteredPassword, stroredHashedPassword);
  }

  public async storeNewSessionInDB(session: Session) {
    await prisma.session.create({
      data: {
        sessionId: session.sessionId,
        userId: session.userId,
        expiresAt: session.expiresAt,
      },
    });
  }

  public async deleteAllUserSession(userId: number) {
    try {
      await prisma.session.deleteMany({ where: { userId } });
    } catch (error) {
      throw new UnauthorizedException(
        'Session with this sessionId didn\t find',
      );
    }
  }
}
