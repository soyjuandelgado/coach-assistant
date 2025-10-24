import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coachee } from './coachee.entity';
import { CoacheesService } from './coachees.service';
import { CoacheesController } from './coachees.controller';
import { User } from 'src/users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coachee, User])],
  providers: [CoacheesService],
  controllers: [CoacheesController],
})
export class CoacheesModule {}
