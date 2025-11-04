import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
export class RoleDto {
  @ApiProperty({ example: 'coach' })
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'Description of the role' })
  @IsString()
  readonly description: string;

  @ApiProperty({ example: 'false' })
  @IsBoolean()
  readonly admin_access: boolean;

  @ApiProperty({ example: 'false' })
  @IsBoolean()
  readonly coachees_access: boolean;
}

//TODO: Export to new file?
export class AddRoleDto {
  @ApiProperty({ description: 'Id of role to add' })
  @IsString()
  roleId: string;
}
