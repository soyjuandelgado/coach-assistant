import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Role } from './role.entity';
import { Equal, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleDto } from './role.dto';

@Injectable()
export class RolesService {
  private readonly logger = new Logger('RolesService');

  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  findAll(): Promise<Role[]> {
    return this.rolesRepository.find();
  }
  async find(roleId: string): Promise<Role> {
    const role = await this.rolesRepository.findOne({
      where: { id: Equal(roleId) },
    });
    if (!role) {
      this.logger.error('find: Role not found');
      throw new NotFoundException('Role not found');
    }
    return role;
  }
  create(newRole: RoleDto): Promise<Role> {
    return this.rolesRepository.save(newRole);
  }
  async delete(roleId: string): Promise<any> {
    const roleWithUsers = await this.rolesRepository.findOne({
      where: { id: Equal(roleId) },
      relations: ['users'],
    });
    if (!roleWithUsers) throw new NotFoundException('Role not found');
    if (roleWithUsers.users.length > 0) {
      throw new BadRequestException('Cannot delete role assigned to users');
    }
    const result = await this.rolesRepository.delete({ id: roleId });
    if (result.affected === 0) {
      this.logger.error('delete: Role not found.');
      throw new NotFoundException('Role not found');
    }
  }
  async update(roleId: string, newRole: RoleDto): Promise<Role> {
    const toUpdate = await this.rolesRepository.findOne({
      where: { id: Equal(roleId) },
    });
    if (!toUpdate) {
      this.logger.error('update: Role not found');
      throw new NotFoundException('Role not found');
    }
    const updated = Object.assign(toUpdate, newRole);
    return this.rolesRepository.save(updated);
  }
}
