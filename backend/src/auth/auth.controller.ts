import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
// import { UserDto } from 'src/features/users/user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/features/users/user.dto';
import { User } from 'src/features/users/user.entity';

@ApiTags('Auth')
@Controller('auth')
@ApiBearerAuth('access-token')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   *
   * @param {email, password} email and password
   * @returns {access-token} Returns access-token
   */
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Log in' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
    // login(@Body() userDto: UserDto) {
    // return this.authService.login(userDto as User);
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  /**
   *
   * @param {}
   * @returns {UserDto} Returns user
   */
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get Profile' })
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
