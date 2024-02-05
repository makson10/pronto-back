import {
  Body,
  Controller,
  ParseIntPipe,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UserProfile } from './interfaces/userProfile.interfaces';
import { UserIdGuard } from 'src/guard/userId.guard';
import { UserProfileService } from './userProfile.service';

@Controller('userprofile')
export class UserProfileController {
  constructor(private userProfileService: UserProfileService) {}

  @Post()
  @UseGuards(UserIdGuard)
  async getUserProfile(
    @Body('userId', ParseIntPipe) userId: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Response<UserProfile>> {
    const profile = await this.userProfileService.getUserProfile(userId);
    return res.status(200).json(profile);
  }
}
