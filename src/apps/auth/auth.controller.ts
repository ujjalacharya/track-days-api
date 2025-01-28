import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  // @Get('google/callback')
  // @UseGuards(AuthGuard('google'))
  // googleAuthRedirect(@Query() query: string, @Req() req, @Res() res) {
  //   return this.authService.googleSignin(req, res);
  // }

  @Post('google/token')
  async googleTokenSignin(@Body('token') token: string) {
    return this.authService.googleSignin(token);
  }
}
