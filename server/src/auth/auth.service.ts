import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

import { Request } from 'express';

import * as bcrypt from "bcrypt";
import { User } from 'src/entities/user.entity';
import { UserLoginDto } from 'src/dtos/user.login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(username: string, password: string, fullName: string, birthDate: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.usersService.create({
        username,
        password: hashedPassword,
        fullName,
        birthDate
    });
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userLoginDto: UserLoginDto) {
    const user = await this.validateUser(userLoginDto.username, userLoginDto.password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
  
    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getUserFromJwtPayload(payload: { username: string, sub: string }): Promise<User> {
    return this.usersService.findOne(payload.sub);
  }

  async getUserFromRequest(req: Request) {
    const token = req.cookies.auth_token;
    const payload = this.jwtService.decode(token) as any;
    
    return this.getUserFromJwtPayload(payload);
  }
}
