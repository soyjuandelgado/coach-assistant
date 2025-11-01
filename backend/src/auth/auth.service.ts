import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/features/users/users.service';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    // private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> { //{ access_token: string }
    console.log(pass);
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    console.log(`user.password: ${user.password}`);
    const isMatch = await bcrypt.compare(pass, user.password);
    console.log(`isMatch: ${isMatch}`);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    //const payload = { sub: user.id, email: user.email}
    const { password, created_at, updated_at, deleted_at, ...result } = user;
    return result;
    // const payload = { sub: result.id, ...result };
    // return {
    //   access_token: await this.jwtService.signAsync(payload),
    // };
  }
}
