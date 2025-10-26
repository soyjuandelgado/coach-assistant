import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Role } from 'src/features/roles/role.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersService');
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['roles'] });
  }

  async find(userId: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: Equal(userId) },
      relations: ['roles'],
    });
    if (!user) {
      this.logger.error('find: User not found');
      throw new NotFoundException('User not found');
    }
    return user;
  }

  create(newUser: UserDto): Promise<User> {
    return this.usersRepository.save(newUser);
  }

  async delete(userId: string): Promise<any> {
    const result = await this.usersRepository.delete(userId);
    if (result.affected === 0) {
      this.logger.error('delete: User not found.');
      throw new NotFoundException('User not found');
    }
  }

  async softRemove(userId: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id: Equal(userId) });
    if (!user) {
      this.logger.error('softRemove: User not found.');
      throw new NotFoundException('User not found');
    }
    return this.usersRepository.softRemove(user);
  }

  async restore(userId: string): Promise<User> {
    const result = await this.usersRepository.restore(userId);
    if (result.affected === 0) {
      this.logger.error('restore: User not found or not soft deleted.');
      throw new NotFoundException('User not found or not soft deleted');
    }
    const user = await this.usersRepository.findOne({
      where: { id: Equal(userId) },
      withDeleted: true,
    });
    if (!user) {
      this.logger.error('restore: User not found.');
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(userId: string, newUser: UserDto): Promise<User> {
    const toUpdate = await this.usersRepository.findOneBy({
      id: Equal(userId),
    });
    if (!toUpdate) {
      this.logger.error('update: User not found');
      throw new NotFoundException('User not found');
    }
    const updated = Object.assign(toUpdate, newUser);
    return this.usersRepository.save(updated);
  }

  async addRole(userId: string, roleId: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: Equal(userId) },
      relations: ['roles'],
    });
    if (!user) {
      this.logger.error('addRole: User not found');
      throw new NotFoundException('User not found.');
    }
    const role = await this.rolesRepository.findOneBy({ id: Equal(roleId) });
    if (!role) {
      this.logger.error('addRole: User not found');
      throw new NotFoundException('Role not found.');
    }
    if (!user.roles.find((r) => r.id === role.id)) {
      user.roles.push(role);
      await this.usersRepository.save(user);
    }
    return user;
  }

  async removeRole(userId: string, roleId: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: Equal(userId) },
      relations: ['roles'],
    });
    if (!user) {
      this.logger.error('removeRole: User not found');
      throw new NotFoundException('User not found.');
    }
    user.roles = user.roles.filter((role) => role.id !== roleId);
    return this.usersRepository.save(user);
  }
}
