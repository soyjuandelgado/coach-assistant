import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProcessesService } from './processes.service';
import { Process } from './process.entity';
import { ProcessDto } from './process.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Process')
@UseGuards(JwtAuthGuard)
@Controller('processes')
export class ProcessesController {
  constructor(private processesService: ProcessesService) {}

  /**
   *
   * @param {} No params
   * @returns {Process[]} Returns process list
   */
  @Get()
  @ApiOperation({ summary: 'Get process list' })
  @ApiResponse({
    status: 200,
    description: 'Process list',
    type: Process,
  })
  findAll(): Promise<Process[]> {
    return this.processesService.findAll();
  }

  /**
   *
   * @param {processId} process id
   * @returns {Process} Returns the process with process id
   */
  @Get(':processId')
  @ApiOperation({ summary: 'Get process' })
  @ApiResponse({
    status: 200,
    description: 'Process data',
    type: Process,
  })
  find(
    @Param('processId', new ParseUUIDPipe()) processId: string,
  ): Promise<Process> {
    return this.processesService.find(processId);
  }

  /**
   *
   * @param {newProcess} Process data
   * @returns {Process} Data of created Process
   */
  @Post(':coacheeId')
  @ApiOperation({ summary: 'Create process' })
  @ApiResponse({
    status: 201,
    description: 'Process data',
    type: Process,
  })
  create(
    @Param('coacheeId', new ParseUUIDPipe()) coacheeId: string,
    @Body() newProcess: ProcessDto,
  ): Promise<Process> {
    return this.processesService.create(coacheeId, newProcess);
  }

  /**
   *
   * @param {processId} process id
   */
  @Delete(':processId')
  @ApiOperation({ summary: 'Delete process' })
  @ApiResponse({
    status: 200,
    description: 'Process deleted',
  })
  delete(
    @Param('processId', new ParseUUIDPipe()) processId: string,
  ): Promise<Process> {
    return this.processesService.delete(processId);
  }

  /**
   *
   * @param {processId} id of the process to update
   * @param {newProcess} process data
   * @returns {Process} updated process
   */
  @Put(':processId')
  @ApiOperation({ summary: 'Update process' })
  @ApiResponse({
    status: 200,
    description: 'Process data',
    type: Process,
  })
  update(
    @Param('processId', new ParseUUIDPipe()) processId: string,
    @Body() newProcess: ProcessDto,
  ): Promise<Process> {
    return this.processesService.update(processId, newProcess);
  }

  /**
   *
   * @param {processId} id of the process to remove
   * @returns {Process} removed process
   */
  @Patch(':processId/remove')
  @ApiOperation({ summary: 'Soft remove process' })
  @ApiResponse({
    status: 200,
    description: 'Process data',
    type: Process,
  })
  softRemove(
    @Param('processId', new ParseUUIDPipe()) processId: string,
  ): Promise<Process> {
    return this.processesService.softRemove(processId);
  }

  /**
   *
   * @param {processId} id of the process to restore
   * @returns {Process} restored user
   */
  @Patch(':processId/restore')
  @ApiOperation({ summary: 'Restore removed process' })
  @ApiResponse({
    status: 200,
    description: 'Process data',
    type: Process,
  })
  restore(
    @Param('processId', new ParseUUIDPipe()) processId: string,
  ): Promise<Process> {
    return this.processesService.restore(processId);
  }
}
