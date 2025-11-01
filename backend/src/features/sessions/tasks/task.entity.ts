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
import { Session } from '../session.entity';

@Entity()
export class Task {
  @ApiProperty({ example: 'f2359024-7660-427d-9253-b35d7ab3dd83' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Example task' })
  @Column()
  text: string;

  @ApiProperty({ example: '2025-10-20 10:30' })
  @Column({ nullable: true })
  scheduled_at?: Date;

  @ApiProperty({ example: '8' })
  @Column({ nullable: true })
  commitment?: number;

  @ApiProperty({ example: 'false' })
  @Column()
  done: boolean;

  @ApiProperty({ example: '2025-10-21T08:23:24.000Z' })
  @CreateDateColumn()
  created_at?: Date;

  @ApiProperty({ example: '2025-10-21T08:23:24.000Z' })
  @UpdateDateColumn()
  updated_at?: Date;

  @ApiProperty({ example: '2025-10-21T08:23:24.000Z' })
  @DeleteDateColumn()
  deleted_at?: Date;

  @ManyToOne(() => Session, (session) => session.tasks)
  @JoinColumn({ name: 'session_id', referencedColumnName: 'id' })
  session: Session;
}
