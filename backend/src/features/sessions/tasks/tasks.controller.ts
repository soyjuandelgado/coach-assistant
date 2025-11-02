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
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { TaskDto } from './task.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Task')
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  /**
   *
   * @param {} No params
   * @returns {Task[]} Returns task list
   */
  @Get()
  @ApiOperation({ summary: 'Get task list' })
  @ApiResponse({
    status: 200,
    description: 'Task list',
    type: Task,
  })
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  /**
   *
   * @param {taskId} task id
   * @returns {Task} Returns the task with task id
   */
  @Get(':taskId')
  @ApiOperation({ summary: 'Get task' })
  @ApiResponse({
    status: 200,
    description: 'Task data',
    type: Task,
  })
  find(@Param('taskId', new ParseUUIDPipe()) taskId: string): Promise<Task> {
    return this.tasksService.find(taskId);
  }

  /**
   *
   * @param {newTask} Task data
   * @returns {Task} Data of created Task
   */
  @Post(':sessionId')
  @ApiOperation({ summary: 'Create task' })
  @ApiResponse({
    status: 201,
    description: 'Task data',
    type: Task,
  })
  create(
    @Param('sessionId', new ParseUUIDPipe()) sessionId: string,
    @Body() newTask: TaskDto,
  ): Promise<Task> {
    return this.tasksService.create(sessionId, newTask);
  }

  /**
   *
   * @param {taskId} task id
   */
  @Delete(':taskId')
  @ApiOperation({ summary: 'Delete task' })
  @ApiResponse({
    status: 200,
    description: 'Task deleted',
  })
  delete(@Param('taskId', new ParseUUIDPipe()) taskId: string): Promise<Task> {
    return this.tasksService.delete(taskId);
  }

  /**
   *
   * @param {taskId} id of the task to update
   * @param {newTask} task data
   * @returns {Task} updated task
   */
  @Put(':taskId')
  @ApiOperation({ summary: 'Update task' })
  @ApiResponse({
    status: 200,
    description: 'Task data',
    type: Task,
  })
  update(
    @Param('taskId', new ParseUUIDPipe()) taskId: string,
    @Body() newTask: TaskDto,
  ): Promise<Task> {
    return this.tasksService.update(taskId, newTask);
  }

  /**
   *
   * @param {taskId} id of the task to remove
   * @returns {Task} removed task
   */
  @Patch(':taskId/remove')
  @ApiOperation({ summary: 'Soft remove task' })
  @ApiResponse({
    status: 200,
    description: 'Task data',
    type: Task,
  })
  softRemove(
    @Param('taskId', new ParseUUIDPipe()) taskId: string,
  ): Promise<Task> {
    return this.tasksService.softRemove(taskId);
  }

  /**
   *
   * @param {taskId} id of the task to restore
   * @returns {Task} restored user
   */
  @Patch(':taskId/restore')
  @ApiOperation({ summary: 'Restore removed task' })
  @ApiResponse({
    status: 200,
    description: 'Task data',
    type: Task,
  })
  restore(@Param('taskId', new ParseUUIDPipe()) taskId: string): Promise<Task> {
    return this.tasksService.restore(taskId);
  }
}
