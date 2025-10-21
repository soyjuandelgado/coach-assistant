import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  //   users: User[] = [
  //     {
  //       id: '1',
  //       email: 'a@a.com',
  //       password: 'pasword1',
  //       is_active: true,
  //       created_at: new Date('2025-10-21 10:00:00'),
  //       updated_at: new Date('2025-10-21 10:00:00'),
  //     },
  //     {
  //       id: '2',
  //       email: 'b@b.com',
  //       password: 'pasword2',
  //       is_active: true,
  //       created_at: new Date('2025-10-21 11:00:00'),
  //       updated_at: new Date('2025-10-21 11:00:00'),
  //     },
  //   ];

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }
  async find(userId: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
  create(newUser: UserDto): Promise<User> {
    return this.usersRepository.save(newUser);
  }
  async delete(userId: string): Promise<any> {
    return await this.usersRepository.delete({ id: userId });
  }
  async update(userId: string, newUser: UserDto): Promise<User> {
    const toUpdate = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!toUpdate) {
      throw new NotFoundException('User not found');
    }
    const updated = Object.assign(toUpdate, newUser);
    return this.usersRepository.save(updated);
  }
}
