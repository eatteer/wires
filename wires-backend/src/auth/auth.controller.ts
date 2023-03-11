import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { Req } from '@nestjs/common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async login(@Body() user: LoginDto) {
    return await this.authService.login(user);
  }

  @Post('signup')
  async register(@Body() user: RegisterDto) {
    return await this.authService.register(user);
  }

  @UseGuards(AuthGuard)
  @Get('refresh')
  public async refresh(@Req() req) {
    const userId = req.body.user;
    return this.authService.refresh(userId);
  }
}
