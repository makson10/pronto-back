import { UserService } from './user.service';
import {
  SignUpResponse,
  LogInResponse,
  LogOutResponse,
  FullUser,
} from './interfaces/user.interfaces';
import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { LogInDto } from './dto/logIn.dto';
import { Request, Response } from 'express';
import { User } from './decorator/user.decorator';
import { CookieGuard } from 'src/guard/cookie.guard';

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

    res.cookie('session', request.sessionID);
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

    res.cookie('session', request.sessionID);
    return res.status(200).json({ isAuthorized: result.isAuthorized });
  }

  @Post('logout')
  @UseGuards(CookieGuard)
  async logOut(
    @Req() request: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response<LogOutResponse>> {
    const sessionId = request.cookies.sessionId;
    await this.userService.logOut(sessionId);

    return res.status(200).json({ okay: true });
  }

  @Post('getuserdata')
  @UseGuards(CookieGuard)
  async getUserData(
    @Req() request: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response<FullUser>> {
    const sessionId = request.cookies.sessiodId;
    const user = await this.userService.getUserData(sessionId);

    return res.status(200).json(user);
  }
}
