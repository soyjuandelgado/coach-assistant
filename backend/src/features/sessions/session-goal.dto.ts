import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SessionGoalDto {
  @ApiProperty({
    example: 'Conseguir aumentar las ventas un 30% el 20/12/2025',
  })
  @IsString()
  goal: string;
}
