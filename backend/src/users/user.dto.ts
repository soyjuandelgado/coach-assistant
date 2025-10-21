import { ApiProperty } from '@nestjs/swagger';
export class UserDto {
  @ApiProperty({ example: 'user@user.com' })
  readonly email: string;

  @ApiProperty({ example: 'asdfA2T3Wer*tdfa_sdf' })
  readonly password: string;
}
