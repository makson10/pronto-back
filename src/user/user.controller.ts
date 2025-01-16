import { UserService } from './user.service';
import { Session } from './interfaces/user.interfaces';
import {
  Body,
  Controller,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { LogInDto } from './dto/logIn.dto';
import { Request, Response } from 'express';
import { User } from './decorator/user.decorator';
import { CookieGuard } from '../guard/cookie.guard';
import { SessionGuard } from '../guard/session.guard';
import { UserIdGuard } from '../guard/userId.guard';
import { SignUpEmailValidation } from '../guard/signUpEmailValidation.guard';
import { UserSession } from './decorator/userSession.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  @UseGuards(SignUpEmailValidation)
  async signUp(
    @Req() request: Request,
    @User() user: SignUpDto,
    @Res() res: Response,
  ) {
    const result = await this.userService.signUp(user);

    await this.userService.createNewUserSession(
      request.sessionID,
      result.sessionUserData.id,
    );

    res.cookie('sessionId', request.sessionID);
    res.status(201).json({
      okay: result.okay,
      user: result.createdUser,
      profile: result.newProfile,
    });
  }

  @Post('login')
  async logIn(
    @Req() request: Request,
    @User() user: LogInDto,
    @Res() res: Response,
  ) {
    const result = await this.userService.logIn(user);

    await this.userService.createNewUserSession(
      request.sessionID,
      result.sessionUserData.id,
    );

    await this.userService.deleteExpiredSessions();

    res.cookie('sessionId', request.sessionID);
    res.status(200).json({
      okay: result.isAuthorized,
      user: result.user,
      profile: result.profile,
    });
  }

  @Post('logout')
  @UseGuards(CookieGuard)
  async logOut(@UserSession() session: Session, @Res() res: Response) {
    await this.userService.logOut(session.userId);
    res.status(200).json({ okay: true });
  }

  @Post('getuseridbysession')
  @UseGuards(CookieGuard)
  @UseGuards(SessionGuard)
  async getUserIdFromSession(
    @UserSession() session: Session,
    @Res() res: Response,
  ) {
    res.status(200).json({ userId: session.userId });
  }

  @Post('getuserdatabysession')
  @UseGuards(CookieGuard)
  @UseGuards(SessionGuard)
  async getUserDataBySession(
    @UserSession() session: Session,
    @Res() res: Response,
  ) {
    const user = await this.userService.getUserData(session.userId);
    res.status(200).json(user);
  }

  @Post('getuserdatabyuserid')
  @UseGuards(UserIdGuard)
  async getUserDataByUserId(
    @Body('userId', ParseIntPipe) userId: number,
    @Res() res: Response,
  ) {
    const user = await this.userService.getUserData(userId);
    res.status(200).json(user);
  }

  @Post('getusericonbyid')
  async getUserIconById(
    @Body('companionId', ParseIntPipe) companionId: number,
    @Res() res: Response,
  ) {
    const iconUrl = await this.userService.getUserIconById(companionId);
    res.status(200).json(iconUrl);
  }
}
