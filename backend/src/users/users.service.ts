import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { User } from './user.class';

@Injectable()
export class UsersService {
  users: User[] = [
    {
      id: '1',
      email: 'a@a.com',
      password: 'pasword1',
      is_active: true,
      created_at: new Date('2025-10-21 10:00:00'),
      updated_at: new Date('2025-10-21 10:00:00'),
    },
    {
      id: '2',
      email: 'b@b.com',
      password: 'pasword2',
      is_active: true,
      created_at: new Date('2025-10-21 11:00:00'),
      updated_at: new Date('2025-10-21 11:00:00'),
    },
  ];

  findAll(): User[] {
    return this.users;
  }
  find(userId: string): User | undefined {
    return this.users.find((user) => user.id == userId);
  }
  create(newUser: UserDto): User {
    let user = new User();

    user.id = '99';
    user.email = newUser.email;
    user.password = newUser.password;
    user.is_active = newUser.is_active;
    user.created_at = new Date();
    user.updated_at = new Date();
    return user;
  }
  delete(userId: string): User | undefined {
    return this.users.find((user) => user.id == userId);
  }
  update(userId: string, newUser: UserDto): User | undefined {
    return this.users.find((user) => user.id == userId);
  }
}
