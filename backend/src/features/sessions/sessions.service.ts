import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './session.entity';
import { Equal, Repository } from 'typeorm';
import { SessionDto } from './session.dto';
import { Process } from '../processes/process.entity';

@Injectable()
export class SessionsService {
  private readonly logger = new Logger('SessionsService');
  constructor(
    @InjectRepository(Session) private sessionsRepository: Repository<Session>,
    @InjectRepository(Process) private processesRepository: Repository<Process>,
  ) {}

  findAll(): Promise<Session[]> {
    return this.sessionsRepository.find();
  }

  async find(sessionId: string): Promise<Session> {
    const session = await this.sessionsRepository.findOne({
      where: { id: Equal(sessionId) },
      relations: ['process', 'notes'],
    });
    if (!session) {
      this.logger.error('Session not found');
      throw new NotFoundException('Session not found');
    }
    return session;
  }

  async create(processId: string, newSessionDto: SessionDto) {
    const process = await this.processesRepository.findOneBy({
      id: Equal(processId),
    });
    if (!process) {
      this.logger.error('create: Process not found.');
      throw new NotFoundException('Process not found.');
    }
    const newSession = this.sessionsRepository.create({
      ...newSessionDto,
      process: process,
    });
    return this.sessionsRepository.save(newSession);
  }

  async delete(sessionId: string): Promise<any> {
    const result = await this.sessionsRepository.delete({
      id: Equal(sessionId),
    });
    if (result.affected === 0) {
      this.logger.error('delete: Session not found.');
      throw new NotFoundException('Session not found');
    }
  }

  async softRemove(sessionId: string): Promise<Session> {
    const session = await this.sessionsRepository.findOneBy({
      id: Equal(sessionId),
    });
    if (!session) {
      this.logger.error('remove: Session not found.');
      throw new NotFoundException('Session not found.');
    }
    return this.sessionsRepository.softRemove(session);
  }

  async restore(sessionId: string): Promise<Session> {
    const result = await this.sessionsRepository.restore({
      id: Equal(sessionId),
    });
    if (result.affected === 0) {
      this.logger.error('restore: Session not found or not soft deleted.');
      throw new NotFoundException('Session not found or not soft deleted');
    }
    const session = await this.sessionsRepository.findOne({
      where: { id: Equal(sessionId) },
      withDeleted: true,
    });
    if (!session) {
      this.logger.error('restore: Session not found.');
      throw new NotFoundException('Session not found');
    }
    return session;
  }

  async update(sessionId: string, newSession: SessionDto): Promise<Session> {
    const toUpdate = await this.sessionsRepository.findOneBy({
      id: Equal(sessionId),
    });
    if (!toUpdate) {
      this.logger.error('update: Session not found.');
      throw new NotFoundException('Session not found.');
    }
    const updated = Object.assign(toUpdate, newSession);
    return this.sessionsRepository.save(updated);
  }
}
