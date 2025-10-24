import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

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

  @ApiProperty({ example: '2025-10-21T08:23:24.000Z' })
  @CreateDateColumn()
  created_at?: Date;

  @ApiProperty({ example: '2025-10-21T08:23:24.000Z' })
  @UpdateDateColumn()
  updated_at?: Date;

  @ApiProperty({ example: '2025-10-21T08:23:24.000Z' })
  @DeleteDateColumn()
  deleted_at?: Date;
}
