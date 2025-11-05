import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NotesService } from './notes.service';
import { Note } from './note.entity';
import { NoteDto } from './note.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Note')
@Controller('notes')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class NotesController {
  constructor(private notesService: NotesService) {}

  /**
   *
   * @param {} No params
   * @returns {Note[]} Returns note list
   */
  @Get()
  @ApiOperation({ summary: 'Get note list' })
  @ApiResponse({
    status: 200,
    description: 'Note list',
    type: Note,
  })
  findAll(): Promise<Note[]> {
    return this.notesService.findAll();
  }

  /**
   *
   * @param {noteId} note id
   * @returns {Note} Returns the note with note id
   */
  @Get(':noteId')
  @ApiOperation({ summary: 'Get note' })
  @ApiResponse({
    status: 200,
    description: 'Note data',
    type: Note,
  })
  find(@Param('noteId', new ParseUUIDPipe()) noteId: string): Promise<Note> {
    return this.notesService.find(noteId);
  }

  /**
   *
   * @param {newNote} Note data
   * @returns {Note} Data of created Note
   */
  @Post(':sessionId')
  @ApiOperation({ summary: 'Create note' })
  @ApiResponse({
    status: 201,
    description: 'Note data',
    type: Note,
  })
  create(
    @Param('sessionId', new ParseUUIDPipe()) sessionId: string,
    @Body() newNote: NoteDto,
  ): Promise<Note> {
    return this.notesService.create(sessionId, newNote);
  }

  /**
   *
   * @param {noteId} note id
   */
  @Delete(':noteId')
  @ApiOperation({ summary: 'Delete note' })
  @ApiResponse({
    status: 200,
    description: 'Note deleted',
  })
  delete(@Param('noteId', new ParseUUIDPipe()) noteId: string): Promise<Note> {
    return this.notesService.delete(noteId);
  }

  /**
   *
   * @param {noteId} id of the note to update
   * @param {newNote} note data
   * @returns {Note} updated note
   */
  @Put(':noteId')
  @ApiOperation({ summary: 'Update note' })
  @ApiResponse({
    status: 200,
    description: 'Note data',
    type: Note,
  })
  update(
    @Param('noteId', new ParseUUIDPipe()) noteId: string,
    @Body() newNote: NoteDto,
  ): Promise<Note> {
    return this.notesService.update(noteId, newNote);
  }

  /**
   *
   * @param {noteId} id of the note to remove
   * @returns {Note} removed note
   */
  @Patch(':noteId/remove')
  @ApiOperation({ summary: 'Soft remove note' })
  @ApiResponse({
    status: 200,
    description: 'Note data',
    type: Note,
  })
  softRemove(
    @Param('noteId', new ParseUUIDPipe()) noteId: string,
  ): Promise<Note> {
    return this.notesService.softRemove(noteId);
  }

  /**
   *
   * @param {noteId} id of the note to restore
   * @returns {Note} restored user
   */
  @Patch(':noteId/restore')
  @ApiOperation({ summary: 'Restore removed note' })
  @ApiResponse({
    status: 200,
    description: 'Note data',
    type: Note,
  })
  restore(@Param('noteId', new ParseUUIDPipe()) noteId: string): Promise<Note> {
    return this.notesService.restore(noteId);
  }
}
