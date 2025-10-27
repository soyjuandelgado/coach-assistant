import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CoacheesGetQueryDto {
  @ApiPropertyOptional({
    type: [String],
    description:
      'relations list to load with Coachee. Example: ["processes", "users"]',
    example: ['processes'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
  relations?: string[];
  @ApiPropertyOptional({
    type: Boolean,
    description: 'show deleted Coachees',
    example: true,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
  deleted?: boolean;
}
