import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/features/users/user.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import path from 'path';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async onModuleInit() {
    const count = await this.repo.count();
    if (count === 0) {
      const seedPath = path.join(process.cwd(), 'seed.sql');

      if (!fs.existsSync(seedPath)) {
        console.log('Archivo seed.sql no encontrado, saltando seed');
        return;
      }
      const sql = fs.readFileSync(seedPath, 'utf8');
      await this.repo.query(sql);
      console.log('Datos iniciales cargados desde bd.sql');
    }
  }
}
