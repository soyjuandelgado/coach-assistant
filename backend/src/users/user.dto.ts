import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
export class UserDto {
  @ApiProperty({ example: 'user@user.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'asdfA2T3Wer*tdfa_sdf' })
  @IsString()
  readonly password: string;
}
