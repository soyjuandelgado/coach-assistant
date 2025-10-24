import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddRoleDto } from 'src/features/roles/role.dto';

@ApiTags('User')
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

  /**
   *
   * @param {userId} id of the user to remove
   * @returns {User} removed user
   */
  @Patch(':userId/remove')
  @ApiOperation({ summary: 'Soft remove user' })
  @ApiResponse({
    status: 201,
    description: 'User data',
    type: User,
  })
  softRemove(@Param('userId') userId: string): Promise<User> {
    return this.usersService.softRemove(userId);
  }

  /**
   *
   * @param {userId} id of the user to restore
   * @returns {User} restored user
   */
  @Patch(':userId/restore')
  @ApiOperation({ summary: 'Restore removed user' })
  @ApiResponse({
    status: 201,
    description: 'User data',
    type: User,
  })
  restore(@Param('userId') userId: string): Promise<User> {
    return this.usersService.restore(userId);
  }

  /**
   *
   * @param {userId} id of the user to update
   * @param {roleId} role id to add
   * @returns {User} updated user
   */
  @Patch(':userId/roles')
  @ApiOperation({ summary: 'Add role to user' })
  @ApiResponse({
    status: 201,
    description: 'User data',
    type: User,
  })
  addRole(
    @Param('userId') userId: string,
    @Body() addRoleDto: AddRoleDto,
  ): Promise<User> {
    return this.usersService.addRole(userId, addRoleDto.roleId);
  }

  /**
   *
   * @param {userId} id of the user to update
   * @param {roleId} role id to add
   * @returns {User} updated user
   */
  @Delete(':userId/roles/:roleId')
  @ApiOperation({ summary: 'Remove role from user' })
  @ApiResponse({
    status: 201,
    description: 'User data',
    type: User,
  })
  removeRole(
    @Param('userId') userId: string,
    @Param('roleId') roleId: string,
  ): Promise<User> {
    return this.usersService.removeRole(userId, roleId);
  }
}
