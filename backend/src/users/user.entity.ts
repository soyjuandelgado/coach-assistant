import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({ example: 'f2359024-7660-427d-9253-b35d7ab3dd83' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'user@user.com' })
  @Column()
  email: string;

  @ApiProperty({ example: 'asdfA2T3Wer*tdfa_sdf' })
  @Column()
  password: string;

  @ApiProperty({ example: 'true' })
  @Column()
  is_active: boolean;

  @ApiProperty({ example: '2025-10-21T08:23:24.000Z' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ApiProperty({ example: '2025-10-21T08:23:24.000Z' })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  updated_at: Date;
}
