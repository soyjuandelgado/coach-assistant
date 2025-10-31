import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Note } from './note.entity';
import { Session } from '../session.entity';
import { NoteDto } from './note.dto';

@Injectable()
export class NotesService {
  private readonly logger = new Logger('NotesService');
  constructor(
    @InjectRepository(Note) private notesRepository: Repository<Note>,
    @InjectRepository(Session) private sessionsRepository: Repository<Session>,
  ) {}

  findAll(): Promise<Note[]> {
    return this.notesRepository.find();
  }

  async find(noteId: string): Promise<Note> {
    const note = await this.notesRepository.findOne({
      where: { id: Equal(noteId) },
    });
    if (!note) {
      this.logger.error('Note not found');
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  async create(sessionId: string, newNoteDto: NoteDto) {
    const session = await this.sessionsRepository.findOneBy({
      id: Equal(sessionId),
    });
    if (!session) {
      this.logger.error('create: Session not found.');
      throw new NotFoundException('Session not found.');
    }
    const newNote = this.notesRepository.create({
      ...newNoteDto,
      session: session,
    });
    return this.notesRepository.save(newNote);
  }

  async delete(noteId: string): Promise<any> {
    const result = await this.notesRepository.delete({
      id: Equal(noteId),
    });
    if (result.affected === 0) {
      this.logger.error('delete: Note not found.');
      throw new NotFoundException('Note not found');
    }
  }

  async softRemove(noteId: string): Promise<Note> {
    const note = await this.notesRepository.findOneBy({
      id: Equal(noteId),
    });
    if (!note) {
      this.logger.error('remove: Note not found.');
      throw new NotFoundException('Note not found.');
    }
    return this.notesRepository.softRemove(note);
  }

  async restore(noteId: string): Promise<Note> {
    const result = await this.notesRepository.restore({
      id: Equal(noteId),
    });
    if (result.affected === 0) {
      this.logger.error('restore: Note not found or not soft deleted.');
      throw new NotFoundException('Note not found or not soft deleted');
    }
    const note = await this.notesRepository.findOne({
      where: { id: Equal(noteId) },
      withDeleted: true,
    });
    if (!note) {
      this.logger.error('restore: Note not found.');
      throw new NotFoundException('Note not found');
    }
    return note;
  }

  async update(noteId: string, newNote: NoteDto): Promise<Note> {
    const toUpdate = await this.notesRepository.findOneBy({
      id: Equal(noteId),
    });
    if (!toUpdate) {
      this.logger.error('update: Note not found.');
      throw new NotFoundException('Note not found.');
    }
    const updated = Object.assign(toUpdate, newNote);
    return this.notesRepository.save(updated);
  }
}
