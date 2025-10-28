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
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SessionsService } from './sessions.service';
import { Session } from './session.entity';
import { SessionDto } from './session.dto';

@ApiTags('Session')
@Controller('sessions')
export class SessionsController {
  constructor(private sessionsService: SessionsService) {}

  /**
   *
   * @param {} No params
   * @returns {Session[]} Returns session list
   */
  @Get()
  @ApiOperation({ summary: 'Get session list' })
  @ApiResponse({
    status: 200,
    description: 'Session list',
    type: Session,
  })
  findAll(): Promise<Session[]> {
    return this.sessionsService.findAll();
  }

  /**
   *
   * @param {sessionId} session id
   * @returns {Session} Returns the session with session id
   */
  @Get(':sessionId')
  @ApiOperation({ summary: 'Get session' })
  @ApiResponse({
    status: 200,
    description: 'Session data',
    type: Session,
  })
  find(
    @Param('sessionId', new ParseUUIDPipe()) sessionId: string,
  ): Promise<Session> {
    return this.sessionsService.find(sessionId);
  }

  /**
   *
   * @param {newSession} Session data
   * @returns {Session} Data of created Session
   */
  @Post(':processId')
  @ApiOperation({ summary: 'Create session' })
  @ApiResponse({
    status: 201,
    description: 'Session data',
    type: Session,
  })
  create(
    @Param('processId', new ParseUUIDPipe()) processId: string,
    @Body() newSession: SessionDto,
  ): Promise<Session> {
    return this.sessionsService.create(processId, newSession);
  }

  /**
   *
   * @param {sessionId} session id
   */
  @Delete(':sessionId')
  @ApiOperation({ summary: 'Delete session' })
  @ApiResponse({
    status: 200,
    description: 'Session deleted',
  })
  delete(
    @Param('sessionId', new ParseUUIDPipe()) sessionId: string,
  ): Promise<Session> {
    return this.sessionsService.delete(sessionId);
  }

  /**
   *
   * @param {sessionId} id of the session to update
   * @param {newSession} session data
   * @returns {Session} updated session
   */
  @Put(':sessionId')
  @ApiOperation({ summary: 'Update session' })
  @ApiResponse({
    status: 200,
    description: 'Session data',
    type: Session,
  })
  update(
    @Param('sessionId', new ParseUUIDPipe()) sessionId: string,
    @Body() newSession: SessionDto,
  ): Promise<Session> {
    return this.sessionsService.update(sessionId, newSession);
  }

  /**
   *
   * @param {sessionId} id of the session to remove
   * @returns {Session} removed session
   */
  @Patch(':sessionId/remove')
  @ApiOperation({ summary: 'Soft remove session' })
  @ApiResponse({
    status: 200,
    description: 'Session data',
    type: Session,
  })
  softRemove(
    @Param('sessionId', new ParseUUIDPipe()) sessionId: string,
  ): Promise<Session> {
    return this.sessionsService.softRemove(sessionId);
  }

  /**
   *
   * @param {sessionId} id of the session to restore
   * @returns {Session} restored user
   */
  @Patch(':sessionId/restore')
  @ApiOperation({ summary: 'Restore removed session' })
  @ApiResponse({
    status: 200,
    description: 'Session data',
    type: Session,
  })
  restore(
    @Param('sessionId', new ParseUUIDPipe()) sessionId: string,
  ): Promise<Session> {
    return this.sessionsService.restore(sessionId);
  }
}
