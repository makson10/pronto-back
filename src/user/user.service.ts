import { Injectable } from '@nestjs/common';
import {
  LogInData,
  NewUserSession,
  QuickAccessUserData,
  SignUpData,
} from './interfaces/user.interfaces';
import { prisma } from 'prisma/prisma';
import * as bcrypt from 'bcrypt';
import { Session } from 'express-session';

@Injectable()
export class UserService {
  private readonly ID_LENGTH = 8;

  private getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  }

  private generateUniqueId() {
    let id = '';

    id += this.getRandomNumber(1, 9);
    for (let i = 0; i < this.ID_LENGTH - 1; i++) {
      id += this.getRandomNumber(0, 9);
    }

    return parseInt(id);
  }

  private async hashingPassword(plainPassword: string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(plainPassword, salt);
  }

  private combineName(firstName: string, lastName: string) {
    return firstName + ' ' + lastName;
  }

  public createNewUserSession(
    sessionId: Session | any,
    quickAccessUserData: QuickAccessUserData,
  ) {
    const session: NewUserSession = {};
    session.user = quickAccessUserData;
    session.sessionId = sessionId;
    return session;
  }

  public async addNewUser(formData: SignUpData) {
    const { firstName, lastName, email, password } = formData;

    const id = this.generateUniqueId();
    const fullName = this.combineName(firstName, lastName);
    const hashedPassword = await this.hashingPassword(password);

    const newUser = { id, ...formData, fullName, password: hashedPassword };
    const quickAccessUserData = { id, firstName, email };

    try {
      await prisma.user.create({ data: newUser });
      return { okay: true, quickAccessUserData };
    } catch (error) {
      console.error(error);
      return { okay: false };
    }
  }

  public async verifyUser(formData: LogInData) {
    const { email: enteredEmail, password: enteredPassword } = formData;
    const foundUsers = await this.searchUsersAccountByEmail(enteredEmail);
    if (!foundUsers) return false;

    const haveAccess = await this.verifyUserPassword(
      enteredPassword,
      foundUsers.password,
    );

    return haveAccess;
  }

  public async searchUsersAccountByEmail(email: string) {
    return await prisma.user.findFirst({ where: { email: email } });
  }

  public async verifyUserPassword(
    enteredPassword: string,
    stroredHashedPassword: string,
  ) {
    return await bcrypt.compare(enteredPassword, stroredHashedPassword);
  }
}
