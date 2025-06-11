import {
  Body,
  Controller,
  ParseIntPipe,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UserIdGuard } from '../guard/userId.guard';
import { ProfileService } from './profile.service';
import { FullUser } from '../user/interfaces/user.interfaces';
import { User } from './decorator/user.decorator';
import { ChangeIconDto } from './dto/changeIcon.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { EditDataDto } from './dto/editDataDto.dto';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';

@Controller('profile')
@ApiTags('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @ApiOperation({ summary: 'Get profile by user ID' })
  @ApiOkResponse({ description: 'Profile retrieved successfully' })
  @ApiBadRequestResponse({ description: 'Error retrieving profile' })
  @ApiBody({ type: Number })
  @Post('getprofile')
  @UseGuards(UserIdGuard)
  async getProfile(
    @Body('userId', ParseIntPipe) userId: number,
    @Res() res: Response,
  ) {
    const profile = await this.profileService.getProfile(userId);
    res.status(200).json(profile);
  }

  @ApiOperation({ summary: 'Add user to verification request list' })
  @ApiOkResponse({ description: 'User added to verification request list successfully' })
  @ApiBadRequestResponse({ description: 'Error adding user to verification request list' })
  @ApiBody({ type: Number })
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

  @ApiOperation({ summary: 'Change user password' })
  @ApiOkResponse({ description: 'User password changed successfully' })
  @ApiBadRequestResponse({ description: 'Error changing user password' })
  @ApiBody({ type: ChangePasswordDto })
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

  @ApiOperation({ summary: 'Change user icon' })
  @ApiOkResponse({ description: 'User icon changed successfully' })
  @ApiBadRequestResponse({ description: 'Error changing user icon' })
  @ApiBody({ type: ChangeIconDto })
  @Post('changeicon')
  @UseGuards(UserIdGuard)
  async changeIcon(@Body() body: ChangeIconDto, @Res() res: Response) {
    const { userId, newIconUrl } = body;
    await this.profileService.changeUserIcon(userId, newIconUrl);
    res.status(200).json({ okay: true });
  }

  @ApiOperation({ summary: 'Delete user icon' })
  @ApiOkResponse({ description: 'User icon deleted successfully' })
  @ApiBadRequestResponse({ description: 'Error deleting user icon' })
  @ApiBody({ type: Number })
  @Post('deleteicon')
  @UseGuards(UserIdGuard)
  async deleteIcon(@Body('userId') userId: number, @Res() res: Response) {
    await this.profileService.deleteIcon(userId);
    res.status(200).json({ okay: true });
  }

  @ApiOperation({ summary: 'Edit user data' })
  @ApiOkResponse({ description: 'User data edited successfully' })
  @ApiBadRequestResponse({ description: 'Error editing user data' })
  @ApiBody({ type: EditDataDto })
  @Post('editdata')
  @UseGuards(UserIdGuard)
  async editData(@Body() body: EditDataDto, @Res() res: Response) {
    const { userId, newProfileData } = body;
    await this.profileService.editData(userId, newProfileData);
    res.status(200).json({ okay: true });
  }

  @ApiOperation({ summary: 'Get user chats' })
  @ApiOkResponse({ description: 'User chats retrieved successfully' })
  @ApiBadRequestResponse({ description: 'Error retrieving user chats' })
  @ApiBody({ type: Number })
  @Post('getuserchats')
  @UseGuards(UserIdGuard)
  async getUserChats(@Body('userId') userId: number, @Res() res: Response) {
    const chats = await this.profileService.getUserChats(userId);
    res.status(200).json(chats);
  }
}
