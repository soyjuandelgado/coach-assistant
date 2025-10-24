import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CoacheesService } from './coachees.service';
import { Coachee } from './coachee.entity';
import { CoacheeDto } from './coachee.dto';

@ApiTags('Coachee')
@Controller('coachees')
export class CoacheesController {
  constructor(private coacheesService: CoacheesService) {}

  /**
   *
   * @param {} No params
   * @returns {Coachee[]} Returns coachee list
   */
  @Get()
  @ApiOperation({ summary: 'Get coachee list' })
  @ApiResponse({
    status: 200,
    description: 'Coachee list',
    type: Coachee,
  })
  findAll(): Promise<Coachee[]> {
    return this.coacheesService.findAll();
  }

  /**
   *
   * @param {coacheeId} coachee id
   * @returns {Coachee} Returns the coachee with coachee id
   */
  @Get(':coacheeId')
  @ApiOperation({ summary: 'Get coachee' })
  @ApiResponse({
    status: 200,
    description: 'Coachee data',
    type: Coachee,
  })
  find(@Param('coacheeId') coacheeId: string): Promise<Coachee> {
    return this.coacheesService.find(coacheeId);
  }

  /**
   *
   * @param {newCoachee} Coachee data
   * @returns {Coachee} Data of created Coachee
   */
  @Post(':userId')
  @ApiOperation({ summary: 'Create coachee' })
  @ApiResponse({
    status: 201,
    description: 'Coachee data',
    type: Coachee,
  })
  create(
    @Param('userId') userId: string,
    @Body() newCoachee: CoacheeDto,
  ): Promise<Coachee> {
    return this.coacheesService.create(userId, newCoachee);
  }

  /**
   *
   * @param {coacheeId} coachee id
   */
  @Delete(':coacheeId')
  @ApiOperation({ summary: 'Delete coachee' })
  @ApiResponse({
    status: 200,
    description: 'Coachee deleted',
  })
  delete(@Param('coacheeId') coacheeId: string): Promise<Coachee> {
    return this.coacheesService.delete(coacheeId);
  }

  /**
   *
   * @param {coacheeId} id of the coachee to update
   * @param {newCoachee} coachee data
   * @returns {Coachee} updated coachee
   */
  @Put(':userId')
  @ApiOperation({ summary: 'Update coachee' })
  @ApiResponse({
    status: 200,
    description: 'Coachee data',
    type: Coachee,
  })
  update(
    @Param('coacheeId') coacheeId: string,
    @Body() newCoachee: CoacheeDto,
  ): Promise<Coachee> {
    return this.coacheesService.update(coacheeId, newCoachee);
  }

  /**
   *
   * @param {coacheeId} id of the coachee to remove
   * @returns {Coachee} removed coachee
   */
  @Patch(':coacheeId/remove')
  @ApiOperation({ summary: 'Soft remove coachee' })
  @ApiResponse({
    status: 200,
    description: 'Coachee data',
    type: Coachee,
  })
  softRemove(@Param('coacheeId') coacheeId: string): Promise<Coachee> {
    return this.coacheesService.softRemove(coacheeId);
  }

  /**
   *
   * @param {coacheeId} id of the coachee to restore
   * @returns {Coachee} restored user
   */
  @Patch(':coacheeId/restore')
  @ApiOperation({ summary: 'Restore removed coachee' })
  @ApiResponse({
    status: 200,
    description: 'Coachee data',
    type: Coachee,
  })
  restore(@Param('coacheeId') coacheeId: string): Promise<Coachee> {
    return this.coacheesService.restore(coacheeId);
  }
}
