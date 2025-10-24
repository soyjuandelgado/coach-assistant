import { Module } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/roles/role.entity';
import { Coachee } from 'src/coachees/coachee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Coachee])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
