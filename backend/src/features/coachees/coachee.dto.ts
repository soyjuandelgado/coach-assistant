import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CoacheeDto {
  @ApiProperty({ example: 'Name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Surname' })
  @IsString()
  surname: string;

  @ApiProperty({ example: 'Middlename' })
  @IsOptional()
  @IsString()
  middlename?: string;

  @ApiProperty({ example: 'user@user.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'Street-name 1, City' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: '+34666666666' })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiProperty({ example: '2000-01-01' })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  birthdate?: Date;

  @ApiProperty({ example: '00000000H' })
  @IsOptional()
  @IsString()
  dni?: string;

  @ApiProperty({ example: 'Company Name SL' })
  @IsOptional()
  @IsString()
  company?: string;

  @ApiProperty({ example: 'CEO' })
  @IsOptional()
  @IsString()
  company_role?: string;

  @ApiProperty({ example: 'Street-name 1, City' })
  @IsOptional()
  @IsString()
  company_address?: string;
}
