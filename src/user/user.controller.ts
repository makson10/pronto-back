import { UserService } from './user.service';
import { SignUpResponse, LogInResponse } from './interfaces/user.interfaces';
import { Body, Controller, Post, Req, Res, Session } from '@nestjs/common';
import { Session as SessionType } from 'express-session';
import { SignUpDto } from './dto/signUp.dto';
import { LogInDto } from './dto/logIn.dto';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async signUp(
    @Req() request: Request,
    @Body('user') user: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response> {
    const result = await this.userService.addNewUser(user);
    if (!result.okay) return res.sendStatus(400);

    const newUserSession = this.userService.createNewUserSession(
      request.sessionID,
      result.quickAccessUserData,
    );

    res.cookie('session', newUserSession);
    return res.status(201).json({ okay: result.okay });
  }

  @Post('login')
  async logIn(@Body('user') user: LogInDto): Promise<LogInResponse> {
    const logined = await this.userService.verifyUser(user);
    return { logined };
  }
}
