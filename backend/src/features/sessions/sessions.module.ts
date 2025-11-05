import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './session.entity';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { Process } from '../processes/process.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Session, Process])],
  providers: [SessionsService],
  controllers: [SessionsController],
})
export class SessionsModule {}
