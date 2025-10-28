import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Process } from './process.entity';
import { Equal, Repository } from 'typeorm';
import { ProcessDto } from './process.dto';
import { Coachee } from '../coachees/coachee.entity';

@Injectable()
export class ProcessesService {
  private readonly logger = new Logger('ProcessesService');
  constructor(
    @InjectRepository(Process) private processesRepository: Repository<Process>,
    @InjectRepository(Coachee) private coacheesRepository: Repository<Coachee>,
  ) {}

  findAll(): Promise<Process[]> {
    return this.processesRepository.find(); //{ relations: ['coachee'] }
  }

  async find(processId: string): Promise<Process> {
    const process = await this.processesRepository.findOne({
      where: { id: Equal(processId) },
      relations: ['sessions'],
    });
    if (!process) {
      this.logger.error('find: Process not found.');
      throw new NotFoundException('Process not found.');
    }
    return process;
  }

  async create(coacheeId: string, newProcessDto: ProcessDto): Promise<Process> {
    const coachee = await this.coacheesRepository.findOneBy({
      id: Equal(coacheeId),
    });
    if (!coachee) {
      this.logger.error('create: Coachee not found.');
      throw new NotFoundException('Coachee not found.');
    }
    const newProcess = this.processesRepository.create({
      ...newProcessDto,
      coachee: coachee,
    });
    return this.processesRepository.save(newProcess);
  }

  async delete(processId: string): Promise<any> {
    const result = await this.processesRepository.delete({
      id: Equal(processId),
    });
    if (result.affected === 0) {
      this.logger.error('delete: Process not found.');
      throw new NotFoundException('Process not found');
    }
  }

  async softRemove(processId: string): Promise<Process> {
    const process = await this.processesRepository.findOneBy({
      id: Equal(processId),
    });
    if (!process) {
      this.logger.error('remove: Process not found.');
      throw new NotFoundException('Process not found.');
    }
    return this.processesRepository.softRemove(process);
  }

  async restore(processId: string): Promise<Process> {
    const result = await this.processesRepository.restore({
      id: Equal(processId),
    });
    if (result.affected === 0) {
      this.logger.error('restore: Process not found or not soft deleted.');
      throw new NotFoundException('Process not found or not soft deleted');
    }
    const process = await this.processesRepository.findOne({
      where: { id: Equal(processId) },
      withDeleted: true,
    });
    if (!process) {
      this.logger.error('restore: Process not found.');
      throw new NotFoundException('Process not found');
    }
    return process;
  }

  async update(processId: string, newProcess: ProcessDto): Promise<Process> {
    const toUpdate = await this.processesRepository.findOneBy({
      id: Equal(processId),
    });
    if (!toUpdate) {
      this.logger.error('update: Process not found.');
      throw new NotFoundException('Process not found.');
    }
    const updated = Object.assign(toUpdate, newProcess);
    return this.processesRepository.save(updated);
  }
}
