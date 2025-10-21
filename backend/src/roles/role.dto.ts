import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class RoleDto {
  @ApiProperty({ example: 'coach' })
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'Description of the role' })
  @IsString()
  readonly description: string;
}

//TODO: Export to new file?
export class AddRoleDto {
  @ApiProperty({ description: 'Id of role to add' })
  roleId: string;
}
