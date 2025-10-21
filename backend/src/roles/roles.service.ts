import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleDto } from './role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private rolesRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<Role[]> {
    return await this.rolesRepository.find();
  }
  async find(roleId: string): Promise<Role> {
    const role = await this.rolesRepository.findOne({ where: { id: roleId } });
    if (!role) {
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
      throw new NotFoundException('Role not found');
    }
    const updated = Object.assign(toUpdate, newRole);
    return this.rolesRepository.save(updated);
  }
}
