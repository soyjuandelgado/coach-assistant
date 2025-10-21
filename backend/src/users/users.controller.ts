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
import { User } from './user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  /**
   *
   * @param {} No params
   * @returns {User[]} Returns user list
   */
  @Get()
  @ApiOperation({ summary: 'Get user list' })
  @ApiResponse({
    status: 201,
    description: 'User list',
    type: User,
  })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  /**
   *
   * @param {userId} user id
   * @returns {User} Returns the user with user id
   */
  @Get(':userId')
  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({
    status: 201,
    description: 'User data',
    type: User,
  })
  find(@Param('userId') userId: string): Promise<User> {
    return this.usersService.find(userId);
  }

  /**
   *
   * @param {newUser} User data
   * @returns {User} Data of created user
   */
  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'User data',
    type: User,
  })
  create(@Body() newUser: UserDto): Promise<User> {
    return this.usersService.create(newUser);
  }

  /**
   *
   * @param {userId} user id
   * @returns {User} deleted user
   */
  @Delete(':userId')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: 201,
    description: 'User data',
    type: User,
  })
  delete(@Param('userId') userId: string): Promise<User> {
    return this.usersService.delete(userId);
  }

  /**
   *
   * @param {userId} id of the user to update
   * @param {newUser} user data
   * @returns {User} updated user
   */
  @Put(':userId')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 201,
    description: 'User data',
    type: User,
  })
  update(
    @Param('userId') userId: string,
    @Body() newUser: UserDto,
  ): Promise<User> {
    return this.usersService.update(userId, newUser);
  }
}
