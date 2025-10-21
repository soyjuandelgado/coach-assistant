import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty({ example: 'coach' })
  readonly name: string;

  @ApiProperty({ example: 'Description of the role' })
  readonly description: string;
}

//TODO: Export to new file?
export class AddRoleDto {
  @ApiProperty({ description: 'Id of role to add' })
  roleId: string;
}
