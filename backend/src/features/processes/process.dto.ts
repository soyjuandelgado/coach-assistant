import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class ProcessDto {
  @ApiProperty({ example: 'Directivo' })
  @IsString()
  type: string;

  @ApiProperty({ example: 90 })
  @IsNumber()
  duration_minutes: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  is_grow: boolean;

  @ApiProperty({
    example: 'Conseguir aumentar las ventas un 30% el 20/12/2025',
    required: false,
  })
  @IsOptional()
  @IsString()
  goal?: string;

  @ApiProperty({ example: '2025-10-20', required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  start_date?: Date;

  @ApiProperty({ example: '2025-10-20', required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  end_date?: Date;

  @ApiProperty({ example: 7, required: false })
  @IsOptional()
  @IsNumber()
  frequency_days?: number;

  @ApiProperty({ example: 'Observaciones del proceso', required: false })
  @IsOptional()
  @IsString()
  observations?: string;

  @ApiProperty({ example: 50.0, required: false })
  @IsOptional()
  @IsNumber()
  session_price?: number;

  @ApiProperty({ example: 'Transferencia', required: false })
  @IsOptional()
  @IsString()
  payment_method?: string;

  @ApiProperty({ example: 30, required: false })
  @IsOptional()
  @IsNumber()
  payment_term_days?: number;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  contract_signed?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  lodp_signed?: boolean;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  rgpd_signed?: boolean;
}
