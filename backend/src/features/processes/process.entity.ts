import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Coachee } from '../coachees/coachee.entity';
import { Session } from '../sessions/session.entity';

@Entity()
export class Process {
  @ApiProperty({ example: 'f2359024-7660-427d-9253-b35d7ab3dd83' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Directivo' })
  @Column()
  type: string;

  @ApiProperty({ example: 90 })
  @Column()
  duration_minutes: number;

  @ApiProperty({ example: true })
  @Column()
  is_grow: boolean;

  @ApiProperty({
    example: 'Conseguir aumentar las ventas un 30% el 20/12/2025',
  })
  @Column({ nullable: true })
  goal?: string;

  @ApiProperty({ example: '2025-10-20' })
  @Column({ nullable: true })
  start_date?: Date;

  @ApiProperty({ example: '2025-10-20' })
  @Column({ nullable: true })
  end_date?: Date;

  @ApiProperty({ example: 7 })
  @Column({ nullable: true })
  frequency_days?: number;

  @ApiProperty({ example: 'Observaciones del proceso' })
  @Column({ type: 'text', nullable: true })
  observations?: string;

  @ApiProperty({ example: 50.0 })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  session_price?: number;

  @ApiProperty({ example: 'Transferencia' })
  @Column({ nullable: true })
  payment_method?: string;

  @ApiProperty({ example: 30 })
  @Column({ nullable: true })
  payment_term_days?: number;

  @ApiProperty({ example: true })
  @Column({ default: false })
  contract_signed: boolean;

  @ApiProperty({ example: true })
  @Column({ default: false })
  lodp_signed: boolean;

  @ApiProperty({ example: true })
  @Column({ default: false })
  rgpd_signed: boolean;

  @ApiProperty({ example: '2025-10-21T08:23:24.000Z' })
  @CreateDateColumn()
  created_at?: Date;

  @ApiProperty({ example: '2025-10-21T08:23:24.000Z' })
  @UpdateDateColumn()
  updated_at?: Date;

  @ApiProperty({ example: '2025-10-21T08:23:24.000Z' })
  @DeleteDateColumn()
  deleted_at?: Date;

  @ManyToOne(() => Coachee, (coachee) => coachee.processes)
  @JoinColumn({ name: 'coachee_id', referencedColumnName: 'id' })
  coachee: Coachee;

  @OneToMany(() => Session, (session) => session.process, { cascade: true })
  sessions: Session[];
}
