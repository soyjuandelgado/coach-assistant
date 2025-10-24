import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './features/users/users.module';
import { configService } from './config/config.service';
import { RolesModule } from './features/roles/role.module';
import { CoacheesModule } from './features/coachees/coachees.module';
import { ProcessesModule } from './features/processes/processes.module';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    CoacheesModule,
    ProcessesModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
