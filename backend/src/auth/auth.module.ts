import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/features/users/users.module';
import { LocalStrategy } from './local.strategy';
import * as dotenv from 'dotenv';
import { PassportModule } from '@nestjs/passport';
// import { JwtModule } from '@nestjs/jwt';

dotenv.config();

@Module({
  imports: [
    UsersModule,
    PassportModule,
    // JwtModule.register({
    //   global: true,
    //   secret: process.env.JWT_SECRET,
    //   signOptions: { expiresIn: '1d' },
    // }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
