import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './features/users/users.module';
import { configService } from './config/config.service';
import { RolesModule } from './features/roles/role.module';
import { CoacheesModule } from './features/coachees/coachees.module';
import { ProcessesModule } from './features/processes/processes.module';
import { SessionsModule } from './features/sessions/sessions.module';
import { NotesModule } from './features/sessions/notes/notes.module';
import { TasksModule } from './features/sessions/tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { SeedService } from './seed/seed.service';
import { User } from './features/users/user.entity';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    CoacheesModule,
    ProcessesModule,
    SessionsModule,
    NotesModule,
    TasksModule,
    AuthModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [],
  providers: [SeedService],
})
export class AppModule {}
