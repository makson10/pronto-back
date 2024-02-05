import { UserService } from './user.service';
import {
  SignUpResponse,
  LogInResponse,
  LogOutResponse,
  FullUser,
  Session,
  GetUserIdBySessionResponse,
} from './interfaces/user.interfaces';
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
import { CookieGuard } from 'src/guard/cookie.guard';
import { SessionGuard } from 'src/guard/session.guard';
import { UserSession } from './decorator/userSession.decorator';
import { UserIdGuard } from 'src/guard/userId.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async signUp(
    @Req() request: Request,
    @User() user: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response<SignUpResponse>> {
    const result = await this.userService.signUp(user);

    await this.userService.createNewUserSession(
      request.sessionID,
      result.sessionUserData.id,
    );

    res.cookie('sessionId', request.sessionID);
    return res.status(201).json({ okay: result.okay });
  }

  @Post('login')
  async logIn(
    @Req() request: Request,
    @User() user: LogInDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response<LogInResponse>> {
    const result = await this.userService.logIn(user);

    await this.userService.createNewUserSession(
      request.sessionID,
      result.sessionUserData.id,
    );

    res.cookie('sessionId', request.sessionID);
    return res.status(200).json({ isAuthorized: result.isAuthorized });
  }

  @Post('logout')
  @UseGuards(CookieGuard)
  async logOut(
    @UserSession() session: Session,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response<LogOutResponse>> {
    await this.userService.logOut(session.userId);
    return res.status(200).json({ okay: true });
  }

  @Post('getuseridbysession')
  @UseGuards(CookieGuard)
  @UseGuards(SessionGuard)
  async getUserIdFromSession(
    @UserSession() session: Session,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response<GetUserIdBySessionResponse>> {
    return res.status(200).json({ userId: session.userId });
  }

  @Post('getuserdatabysession')
  @UseGuards(CookieGuard)
  @UseGuards(SessionGuard)
  async getUserDataBySession(
    @UserSession() session: Session,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response<FullUser>> {
    const user = await this.userService.getUserData(session.userId);
    return res.status(200).json(user);
  }

  @Post('getuserdatabyuserid')
  @UseGuards(UserIdGuard)
  async getUserDataByUserId(
    @Body('userId', ParseIntPipe) userId: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response<FullUser>> {
    const user = await this.userService.getUserData(userId);
    return res.status(200).json(user);
  }
}
