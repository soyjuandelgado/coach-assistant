import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note.entity';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { Session } from '../session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note, Session])],
  providers: [NotesService],
  controllers: [NotesController],
})
export class NotesModule {}
