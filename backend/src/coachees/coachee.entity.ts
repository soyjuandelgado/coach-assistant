import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
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

@Entity()
export class Coachee {
  @ApiProperty({ example: 'f2359024-7660-427d-9253-b35d7ab3dd83' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Name' })
  @Column()
  name: string;

  @ApiProperty({ example: 'Surname' })
  @Column()
  surname: string;

  @ApiProperty({ example: 'Middlename' })
  @Column({ nullable: true })
  middlename?: string;

  @ApiProperty({ example: 'user@user.com' })
  @Column({ nullable: true })
  email?: string;

  @ApiProperty({ example: 'Street-name 1, City' })
  @Column({ nullable: true })
  address?: string;

  @ApiProperty({ example: '+34666666666' })
  @Column({ nullable: true })
  phone?: string;

  @ApiProperty({ example: '2000-01-01' })
  @Column({ nullable: true })
  birthdate?: Date;

  @ApiProperty({ example: '00000000H' })
  @Column({ nullable: true })
  dni?: string;

  @ApiProperty({ example: 'Company Name SL' })
  @Column({ nullable: true })
  company?: string;

  @ApiProperty({ example: 'CEO' })
  @Column({ nullable: true })
  company_role?: string;

  @ApiProperty({ example: 'Street-name 1, City' })
  @Column({ nullable: true })
  company_address?: string;

  @ApiProperty({ example: '2025-10-21T08:23:24.000Z' })
  @CreateDateColumn()
  created_at?: Date;

  @ApiProperty({ example: '2025-10-21T08:23:24.000Z' })
  @UpdateDateColumn()
  updated_at?: Date;

  @ApiProperty({ example: '2025-10-21T08:23:24.000Z' })
  @DeleteDateColumn()
  deleted_at?: Date;

  @ManyToOne(() => User, (user) => user.coachees)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  coach: User;
}
