import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';

@Entity()
export class Role {
  @ApiProperty({ example: 'f2359024-7660-427d-9253-b35d7ab3dd83' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'coach' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ example: 'Description of the role' })
  @Column('text')
  description: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
