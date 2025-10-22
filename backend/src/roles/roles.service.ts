import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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
  create(newRole: RoleDto): Promise<Role> {
    return this.rolesRepository.save(newRole);
  }
  async delete(roleId: string): Promise<any> {
    //TODO: check no user with this role
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
