import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class ProcessDto {
  @ApiProperty({ example: 'Directivo' })
  @IsString()
  type: string;

  @ApiProperty({ example: '90' })
  @IsNumber()
  duration_minutes: number;

  @ApiProperty({ example: 'true' })
  @IsBoolean()
  is_grow: boolean;

  @ApiProperty({
    example: 'Conseguir aumentar las ventas un 30% el 20/12/2025',
  })
  @IsOptional()
  @IsString()
  goal?: string;
}
