import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty({ example: 'coach' })
  readonly name: string;

  @ApiProperty({ example: 'Description of the role' })
  readonly description: string;
}
