import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Process } from '../processes/process.entity';

@Entity()
export class Session {
  @ApiProperty({ example: 'f2359024-7660-427d-9253-b35d7ab3dd83' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: '2025-10-20' })
  @Column()
  date: Date;

  @ApiProperty({ example: 7 })
  @Column()
  session_number: number;

  @ApiProperty({ example: true })
  @Column()
  is_grow: boolean;

  @ApiProperty({ example: 90 })
  @Column()
  duration_minutes: number;

  @ApiProperty({ example: 'Online' })
  @Column()
  location: string;
  @ApiProperty({
    example: 'Conseguir aumentar las ventas un 30% el 20/12/2025',
  })
  @Column({ nullable: true })
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

  @ManyToOne(() => Process, (process) => process.sessions)
  @JoinColumn({ name: 'process_id', referencedColumnName: 'id' })
  process: Process;
}
