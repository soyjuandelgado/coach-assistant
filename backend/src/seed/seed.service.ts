import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/features/users/user.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async onModuleInit() {
    const count = await this.repo.count();
    if (count === 0) {
      const sql = fs.readFileSync('./seed.sql', 'utf8');
      await this.repo.query(sql);
      console.log('Datos iniciales cargados desde bd.sql');
    }
  }
}
