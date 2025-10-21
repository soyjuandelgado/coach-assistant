import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';
import { User } from './user.class';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(): User[] {
    return this.usersService.findAll();
  }

  @Get(':userId')
  find(@Param('userId') userId: string): User | undefined {
    return this.usersService.find(userId);
  }

  @Post()
  create(@Body() newUser: UserDto): User {
    return this.usersService.create(newUser);
  }

  @Delete(':userId')
  delete(@Param('userId') userId: string): User | undefined {
    return this.usersService.delete(userId);
  }

  @Put(':userId')
  update(
    @Param('userId') userId: string,
    @Body() newUser: UserDto,
  ): User | undefined {
    return this.usersService.update(userId, newUser);
  }
}
