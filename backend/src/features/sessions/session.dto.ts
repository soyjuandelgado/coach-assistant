import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class SessionDto {
  @ApiProperty({ example: '2025-10-20' })
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty({ example: 7 })
  @IsNumber()
  session_number: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  is_grow: boolean;

  @ApiProperty({ example: 90 })
  @IsNumber()
  duration_minutes: number;

  @ApiProperty({ example: 'Online' })
  @IsString()
  location: string;

  @ApiProperty({
    example: 'Conseguir aumentar las ventas un 30% el 20/12/2025',
  })
  @IsOptional()
  @IsString()
  goal?: string;
}
