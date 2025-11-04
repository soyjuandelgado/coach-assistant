import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/features/users/users.service';
import bcrypt from 'bcrypt';
import { ValidatedUser } from './auth.types';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/features/users/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<ValidatedUser> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { password, created_at, updated_at, deleted_at, ...result } = user;
    return result;
  }

  async login(user: ValidatedUser) {
    const payload = { sub: user.id, ...user };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
