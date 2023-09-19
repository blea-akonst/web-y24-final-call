import { Body, Controller, Post, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/dtos/user.dto';
import { UserLoginDto } from 'src/dtos/user.login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly jwtService: JwtService) {}

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto, @Res() res: Response) {
    const { access_token } = await this.authService.login(userLoginDto);
    
    res.cookie('auth_token', access_token, { httpOnly: true });
    
    return res.status(200).send({ status: 'Logged in successfully' });
  }

  @Post('register')
  async register(@Body() userDto: UserDto) {
    return this.authService.register(userDto.username, userDto.password, userDto.fullName, userDto.birthDate);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return this.authService.getUserFromRequest(req)
  }
}