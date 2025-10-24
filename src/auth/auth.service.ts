import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { UserJwt } from './UserJwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // @UseGuards(AuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
  // async currentAuthenticatedUser() {
  // 	this.jwtService.verifyAsync(

  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   return user;
  // }

  async signIn(email: string, pass: string): Promise<UserJwt> {
    // TODO: check hashed password with bcrypt
    const user = await this.usersService.findByEmail(email);

    console.debug('AuthService.signIn found user', user);

    if (!user) {
      throw new UnauthorizedException();
    }

    const matches = await bcrypt.compare(pass, user.hashedPassword);

    console.debug('AuthService.signIn password match:', matches);

    if (!matches) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user_id: user.id.toString(),
      user_email: user.email,
    };
  }

  async register(
    email: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const hashedPassword = await bcrypt.hash(pass, 10);

    await this.usersService.create({
      email,
      hashedPassword,
    });

    return this.signIn(email, pass);
  }
}
