import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
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
