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
export class Note {
  @ApiProperty({ example: 'f2359024-7660-427d-9253-b35d7ab3dd83' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'N' })
  @Column()
  type: string;

  @ApiProperty({ example: 'Example note' })
  @Column()
  text: string;

  @ApiProperty({ example: '2025-10-21T08:23:24.000Z' })
  @CreateDateColumn()
  created_at?: Date;

  @ApiProperty({ example: '2025-10-21T08:23:24.000Z' })
  @UpdateDateColumn()
  updated_at?: Date;

  @ApiProperty({ example: '2025-10-21T08:23:24.000Z' })
  @DeleteDateColumn()
  deleted_at?: Date;

  @ManyToOne(() => Session, (session) => session.notes)
  @JoinColumn({ name: 'session_id', referencedColumnName: 'id' })
  session: Session;
}
