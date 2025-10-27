import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coachee } from './coachee.entity';
import { Equal, Repository } from 'typeorm';
import { CoacheeDto } from './coachee.dto';
import { User } from 'src/features/users/user.entity';
import { CoacheesGetQueryDto } from './coachees-get-query.dto';

@Injectable()
export class CoacheesService {
  private readonly logger = new Logger('CoacheesService');
  constructor(
    @InjectRepository(Coachee) private coacheesRepository: Repository<Coachee>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findAll(params: CoacheesGetQueryDto): Promise<Coachee[]> {
    const findOptions: any = {};

    if (params.relations) {
      findOptions.relations = params.relations;
    }
    if (params.deleted) {
      findOptions.withDeleted = true;
    }
    return this.coacheesRepository.find(findOptions); //{ withDeleted: true } //{ relations: ['processes'] }
  }

  async find(coacheeId: string): Promise<Coachee> {
    const coachee = await this.coacheesRepository.findOne({
      where: { id: Equal(coacheeId) },
      relations: ['processes'],
    });
    if (!coachee) {
      this.logger.error('find: Coachee not found.');
      throw new NotFoundException('Coachee not found.');
    }
    return coachee;
  }

  async create(userId: string, newCoacheeDto: CoacheeDto): Promise<Coachee> {
    const user = await this.usersRepository.findOneBy({ id: Equal(userId) });
    if (!user) {
      this.logger.error('create: User not found.');
      throw new NotFoundException('User not found.');
    }
    const newCoachee = this.coacheesRepository.create({
      ...newCoacheeDto,
      coach: user,
    });
    return this.coacheesRepository.save(newCoachee);
  }

  async delete(coacheeId: string): Promise<any> {
    const result = await this.coacheesRepository.delete({
      id: Equal(coacheeId),
    });
    if (result.affected === 0) {
      this.logger.error('delete: Coachee not found.');
      throw new NotFoundException('Coachee not found');
    }
  }

  async softRemove(coacheeId: string): Promise<Coachee> {
    const coachee = await this.coacheesRepository.findOneBy({
      id: Equal(coacheeId),
    });
    if (!coachee) {
      this.logger.error('softRemove: Coachee not found.');
      throw new NotFoundException('Coachee not found');
    }
    return this.coacheesRepository.softRemove(coachee);
  }

  async restore(coacheeId: string): Promise<Coachee> {
    const result = await this.coacheesRepository.restore(coacheeId);
    if (result.affected === 0) {
      this.logger.error('restore: Coachee not found or not soft deleted.');
      throw new NotFoundException('Coachee not found or not soft deleted');
    }
    const coachee = await this.coacheesRepository.findOne({
      where: { id: Equal(coacheeId) },
      withDeleted: true,
    });
    if (!coachee) {
      this.logger.error('restore: Coachee not found.');
      throw new NotFoundException('Coachee not found');
    }
    return coachee;
  }

  async update(coacheeId: string, newCoachee: CoacheeDto): Promise<Coachee> {
    const toUpdate = await this.coacheesRepository.findOneBy({
      id: Equal(coacheeId),
    });
    if (!toUpdate) {
      this.logger.error('update: Coacchee not found.');
      throw new NotFoundException('Coacchee not found.');
    }
    const updated = Object.assign(toUpdate, newCoachee);
    return this.coacheesRepository.save(updated);
  }
}
