import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class TaskDto {
  @ApiProperty({ example: 'Example task' })
  @IsString()
  text: string;

  @ApiProperty({ example: '2025-10-20 10:30' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  scheduled_at?: Date;

  @ApiProperty({ example: '8' })
  @IsOptional()
  @IsNumber()
  commitment?: number;

  @ApiProperty({ example: 'false' })
  @IsBoolean()
  done: boolean;
}
