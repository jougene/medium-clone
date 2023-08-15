import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from '../dto/user.login.dto';
import { UserRegisterDto } from '../dto/user.register.dto';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto): Promise<any> {
    return this.authService.login(userLoginDto.email, userLoginDto.password);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async logout(@Req() req: Request): Promise<any> {
    const authUser = req['user'];

    return { id: authUser.id, email: authUser.email };
  }

  @Post('register')
  async register(@Body() userRegisterDto: UserRegisterDto): Promise<any> {
    return this.authService.register(userRegisterDto.email, userRegisterDto.password);
  }
}
