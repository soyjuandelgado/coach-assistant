import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './role.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleDto } from './role.dto';

@ApiTags('Role')
@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  /**
   *
   * @param {} No params
   * @returns {Role[]} Returns roles list
   */
  @Get()
  @ApiOperation({ summary: 'Get roles list' })
  @ApiResponse({
    status: 201,
    description: 'Roles list',
    type: Role,
  })
  findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  /**
   *
   * @param {roleId} role id
   * @returns {Role} Returns the role with role id
   */
  @Get(':roleId')
  @ApiOperation({ summary: 'Get role' })
  @ApiResponse({
    status: 201,
    description: 'Role data',
    type: Role,
  })
  find(@Param('roleId') roleId: string): Promise<Role> {
    return this.rolesService.find(roleId);
  }

  /**
   *
   * @param {newRole} Role data
   * @returns {Role} Data of created role
   */
  @Post()
  @ApiOperation({ summary: 'Create role' })
  @ApiResponse({
    status: 201,
    description: 'role data',
    type: Role,
  })
  create(@Body() newRole: RoleDto): Promise<Role> {
    return this.rolesService.create(newRole);
  }

  /**
   *
   * @param {roleId} role id
   * @returns {Role} deleted role
   */
  @Delete(':roleId')
  @ApiOperation({ summary: 'Delete role' })
  @ApiResponse({
    status: 201,
    description: 'Role data',
    type: Role,
  })
  delete(@Param('roleId') roleId: string): Promise<Role> {
    return this.rolesService.delete(roleId);
  }

  /**
   *
   * @param {roleId} id of the role to update
   * @param {newRole} role data
   * @returns {Role} updated role
   */
  @Put(':roleId')
  @ApiOperation({ summary: 'Update role' })
  @ApiResponse({
    status: 201,
    description: 'Role data',
    type: Role,
  })
  update(
    @Param('roleId') roleId: string,
    @Body() newRole: RoleDto,
  ): Promise<Role> {
    return this.rolesService.update(roleId, newRole);
  }
}
