import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { configService } from './config/config.service';
import { RolesModule } from './roles/role.module';
import { CoacheesModule } from './coachees/coachees.module';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    CoacheesModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
