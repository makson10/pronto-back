import {
  Body,
  Controller,
  ParseIntPipe,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UserIdGuard } from 'src/guard/userId.guard';
import { ProfileService } from './profile.service';
import { ChangePasswordBody } from './interfaces/profile.interfaces';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post()
  @UseGuards(UserIdGuard)
  async getProfile(
    @Body('userId', ParseIntPipe) userId: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    const profile = await this.profileService.getProfile(userId);
    res.status(200).json(profile);
  }

  @Post('addusertoverificationrequestlist')
  @UseGuards(UserIdGuard)
  async getUserVerificationRequest(
    @Body('userId', ParseIntPipe) userId: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.profileService.addUserToVerificationRequestList(userId);
    await this.profileService.updateProfile(userId, {
      sentVerificationRequest: true,
    });
    res.status(200).json({ okay: true });
  }

  @Post('test')
  async resetVerificationData(@Res({ passthrough: true }) res: Response) {
    await this.profileService.resetVerificationData();
    res.status(200).json({ okay: true });
  }

  @Post('changepassword')
  async changePassword(
    @Body() body: ChangePasswordBody,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { userId, oldPassword, newPassword } = body;
    await this.profileService.comparePasswordWithStored(userId, oldPassword);
    // await changeUserPassword(newPassword);
    res.status(200).json({ okay: true });
  }
}
