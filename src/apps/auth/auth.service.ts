import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private oauthClient: OAuth2Client;
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.oauthClient = new OAuth2Client(
      this.configService.get<string>('GOOGLE_CLIENT_ID'),
    );
  }

  async verifyGoogleToken(token: string) {
    const ticket = await this.oauthClient.verifyIdToken({
      idToken: token,
      audience: this.configService.get<string>('GOOGLE_CLIENT_ID'),
    });
    const payload = ticket.getPayload();
    return payload;
  }

  async googleSignin(req: any) {
    if (!req.user) {
      return new UnauthorizedException();
    }

    const googleResponse = req.user;

    console.log(googleResponse);

    const user = await this.usersService.findOneOrCreate({
      email: googleResponse.email,
      firstName: googleResponse.given_name,
      lastName: googleResponse.family_name,
      username: googleResponse.googleId,
      ...googleResponse,
    });

    const payload = {
      email: user.email,
      sub: user.id,
      name: user.firstName,
      picture: user.picture,
    };

    const jwt_token = this.jwtService.sign(payload);

    return { jwt_token };
  }
  async validateUser(payload: any) {
    return await this.usersService.findUserByEmail(payload.email);
  }
}
