import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleDto } from './role.dto';

@Injectable()
export class RolesService {
  private readonly logger = new Logger('RolesService');

  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<Role[]> {
    return await this.rolesRepository.find();
  }
  async find(roleId: string): Promise<Role> {
    const role = await this.rolesRepository.findOne({ where: { id: roleId } });
    if (!role) {
      this.logger.error('find: Role not found');
      throw new NotFoundException('Role not found');
    }
    return role;
  }
  async create(newRole: RoleDto): Promise<Role> {
    return await this.rolesRepository.save(newRole);
  }
  async delete(roleId: string): Promise<any> {
    const roleWithUsers = await this.rolesRepository.findOne({
      where: { id: roleId },
      relations: ['users'],
    });
    if (!roleWithUsers) throw new NotFoundException('Role not found');
    if (roleWithUsers.users.length > 0) {
      throw new BadRequestException('Cannot delete role assigned to users');
    }
    return await this.rolesRepository.delete({ id: roleId });
  }
  async update(roleId: string, newRole: RoleDto): Promise<Role> {
    const toUpdate = await this.rolesRepository.findOne({
      where: { id: roleId },
    });
    if (!toUpdate) {
      this.logger.error('update: Role not found');
      throw new NotFoundException('Role not found');
    }
    const updated = Object.assign(toUpdate, newRole);
    return this.rolesRepository.save(updated);
  }
}
