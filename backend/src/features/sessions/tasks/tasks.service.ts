import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Session } from '../session.entity';
import { Equal, Repository } from 'typeorm';
import { TaskDto } from './task.dto';

@Injectable()
export class TasksService {
  private readonly logger = new Logger('TasksService');
  constructor(
    @InjectRepository(Task) private tasksRepository: Repository<Task>,
    @InjectRepository(Session) private sessionsRepository: Repository<Session>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async find(taskId: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id: Equal(taskId) },
    });
    if (!task) {
      this.logger.error('Task not found');
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async create(sessionId: string, newTaskDto: TaskDto) {
    const session = await this.sessionsRepository.findOneBy({
      id: Equal(sessionId),
    });
    if (!session) {
      this.logger.error('create: Session not found.');
      throw new NotFoundException('Session not found.');
    }
    const newTask = this.tasksRepository.create({
      ...newTaskDto,
      session: session,
    });
    return this.tasksRepository.save(newTask);
  }

  async delete(taskId: string): Promise<any> {
    const result = await this.tasksRepository.delete({
      id: Equal(taskId),
    });
    if (result.affected === 0) {
      this.logger.error('delete: Task not found.');
      throw new NotFoundException('Task not found');
    }
  }

  async softRemove(taskId: string): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({
      id: Equal(taskId),
    });
    if (!task) {
      this.logger.error('remove: Task not found.');
      throw new NotFoundException('Task not found.');
    }
    return this.tasksRepository.softRemove(task);
  }

  async restore(taskId: string): Promise<Task> {
    const result = await this.tasksRepository.restore({
      id: Equal(taskId),
    });
    if (result.affected === 0) {
      this.logger.error('restore: Task not found or not soft deleted.');
      throw new NotFoundException('Task not found or not soft deleted');
    }
    const task = await this.tasksRepository.findOne({
      where: { id: Equal(taskId) },
      withDeleted: true,
    });
    if (!task) {
      this.logger.error('restore: Task not found.');
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async update(taskId: string, newTask: TaskDto): Promise<Task> {
    const toUpdate = await this.tasksRepository.findOneBy({
      id: Equal(taskId),
    });
    if (!toUpdate) {
      this.logger.error('update: Task not found.');
      throw new NotFoundException('Task not found.');
    }
    const updated = Object.assign(toUpdate, newTask);
    return this.tasksRepository.save(updated);
  }
}
