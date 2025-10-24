import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Process } from './process.entity';
import { ProcessesService } from './processes.service';
import { ProcessesController } from './processes.controller';
import { Coachee } from '../coachees/coachee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Process, Coachee])],
  providers: [ProcessesService],
  controllers: [ProcessesController],
})
export class ProcessesModule {}
