import { Body, Controller, Post, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import {ApiOperation, ApiTags} from '@nestjs/swagger';
import { UserDto } from 'src/dtos/user.dto';
import { UserLoginDto } from 'src/dtos/user.login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

import { Response } from 'express';

import { UserProfileDto } from "../dtos/user.profile.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly jwtService: JwtService) {}

  @ApiOperation({
    summary: 'Get existing profile of authorized user'
  })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    let userProfile: UserProfileDto;

    await this.authService.getUserFromRequest(req)
        .then(result => {
          userProfile = new UserProfileDto(result)
        })
        .catch(err => { throw new Error(err) })

    return userProfile;
  }

  @ApiOperation({
    summary: 'Login with existing credentials'
  })
  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto, @Res() res: Response) {
    const { access_token } = await this.authService.login(userLoginDto);
    
    res.cookie('auth_token', access_token, { httpOnly: true });
    
    return res.status(200).send({ status: 'Logged in successfully' });
  }

  @ApiOperation({
    summary: 'Register on website'
  })
  @Post('register')
  async register(@Body() userDto: UserDto) {
    return this.authService.register(userDto.username, userDto.password, userDto.fullName, userDto.birthDate);
  }
}