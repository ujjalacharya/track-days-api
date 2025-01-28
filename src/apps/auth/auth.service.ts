import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async googleSignin(req: any) {
    if (!req.user) {
      return 'No user from google';
    }

    const user = await this.usersService.findOneOrCreate(req.user);

    const payload = {
      email: user.email,
      sub: user.id,
      name: user.firstName,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
