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
import { FullUser } from 'src/user/interfaces/user.interfaces';
import { User } from './decorator/user.decorator';
import { ChangeIconDto } from './dto/changeIcon.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { EditDataDto } from './dto/editDataDto.dto';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post('getprofile')
  @UseGuards(UserIdGuard)
  async getProfile(
    @Body('userId', ParseIntPipe) userId: number,
    @Res() res: Response,
  ) {
    const profile = await this.profileService.getProfile(userId);
    res.status(200).json(profile);
  }

  @Post('addusertoverificationrequestlist')
  @UseGuards(UserIdGuard)
  async getUserVerificationRequest(
    @Body('userId', ParseIntPipe) userId: number,
    @Res() res: Response,
  ) {
    await this.profileService.addUserToVerificationRequestList(userId);
    await this.profileService.updateProfile(userId, {
      sentVerificationRequest: true,
    });
    res.status(200).json({ okay: true });
  }

  @Post('changepassword')
  @UseGuards(UserIdGuard)
  async changePassword(
    @User() user: FullUser,
    @Body() body: ChangePasswordDto,
    @Res() res: Response,
  ) {
    const { oldPassword, newPassword } = body;
    await this.profileService.comparePasswordWithStored(
      oldPassword,
      user.password,
    );
    await this.profileService.changeUserPassword(user.id, newPassword);

    res.status(200).json({ okay: true });
  }

  @Post('changeicon')
  @UseGuards(UserIdGuard)
  async changeIcon(@Body() body: ChangeIconDto, @Res() res: Response) {
    const { userId, newIconUrl } = body;
    await this.profileService.changeUserIcon(userId, newIconUrl);
    res.status(200).json({ okay: true });
  }

  @Post('deleteicon')
  @UseGuards(UserIdGuard)
  async deleteIcon(@Body('userId') userId: number, @Res() res: Response) {
    await this.profileService.deleteIcon(userId);
    res.status(200).json({ okay: true });
  }

  @Post('editdata')
  @UseGuards(UserIdGuard)
  async editData(@Body() body: EditDataDto, @Res() res: Response) {
    const { userId, newProfileData } = body;
    await this.profileService.editData(userId, newProfileData);
    res.status(200).json({ okay: true });
  }
}
