import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/roles/role.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersService');
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({ relations: ['roles'] });
  }

  async find(userId: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
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
    // return await this.usersRepository.delete({ id: userId });
    const inactive = { is_active: false };
    const toUpdate = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!toUpdate) {
      this.logger.error('delete: User not found');
      throw new NotFoundException('User not found');
    }
    const updated = Object.assign(toUpdate, inactive);
    return this.usersRepository.save(updated);
  }

  async update(userId: string, newUser: UserDto): Promise<User> {
    console.log(newUser);
    const toUpdate = await this.usersRepository.findOne({
      where: { id: userId },
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
      where: { id: userId },
      relations: ['roles'],
    });
    if (!user) {
      this.logger.error('addRole: User not found');
      throw new NotFoundException('User not found.');
    }
    const role = await this.rolesRepository.findOneBy({ id: roleId });
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
      where: { id: userId },
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
