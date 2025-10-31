import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class NoteDto {
  @ApiProperty({ example: 'N' })
  @IsString()
  type: string;

  @ApiProperty({ example: 'Example note' })
  @IsString()
  text: string;
}
