import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { Registration } from './entities/registration.entity';

import { StatusEnum } from 'src/statuses/statuses.enum';
import { CreateRegistrationDto } from './dto/create.dto';
import { UpdateRegistrationDto } from './dto/update.dto';
import { RegistrationService } from './registration.service';
const relations = [
  { field: 'posts', entity: 'posts' },
  { field: 'posts.subjects', entity: 'subject' },

  { field: 'posts.gradeLevels', entity: 'grade' },
  { field: 'user', entity: 'user' },
];

@ApiBearerAuth()
@ApiTags('Registration')
@Roles()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'registration',
  version: '1',
})
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Request() request,
    @Body() createRegistrationDto: CreateRegistrationDto,
  ): Promise<Registration[]> {
    const id = request.user.id;
    const existingData = await this.registrationService.findOne({
      postsId: createRegistrationDto.postsId,
      userId: id,
    });
    console.log(
      '🚀 ~ file: registration.controller.ts:53 ~ RegistrationController ~ existingData:',
      existingData,
    );

    return this.registrationService.create({
      ...createRegistrationDto,
      userId: id,
    });
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'searchName', required: false })
  @ApiQuery({ name: 'sortBy', required: false })
  @ApiQuery({ name: 'sortDirection', required: false })
  @ApiQuery({ name: 'sortBy', required: false })
  @ApiQuery({ name: 'fieldSearch', required: false })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(1000), ParseIntPipe) limit: number,
    @Query('sortBy', new DefaultValuePipe('createdAt')) sortBy: string,
    @Query('sortDirection', new DefaultValuePipe('ASC')) sortDirection: string,
    @Query('status', new DefaultValuePipe(0), ParseIntPipe) status: number,
    @Query('fieldSearch', new DefaultValuePipe('')) fieldSearch: string | string[],
    @Query('searchName', new DefaultValuePipe('')) searchName: string,
  ): Promise<InfinityPaginationResultType<Registration>> {
    if (limit > 50) {
      limit = 1000;
    }

    return await this.registrationService.findManyWithPagination({
      page,
      limit,
      status,
      sortBy,
      sortDirection,
      searchName,
      fieldSearch,
      relations,
    });
  }

  @Get('/active')
  @HttpCode(HttpStatus.OK)
  getActive(): Promise<Registration[]> {
    return this.registrationService.findManyActive(StatusEnum['active']);
  }
  @Get('/register')
  @HttpCode(HttpStatus.OK)
  async register(@Request() request): Promise<Registration[] | null> {
    return this.registrationService.findMany({ userId: request.user.id });
  }

  @Get('/post/:id')
  @HttpCode(HttpStatus.OK)
  async post(@Param('id') id: string): Promise<Registration[] | null> {
    return this.registrationService.findMany({ postsId: id }, relations);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<Registration>> {
    return this.registrationService.findOne({ id: +id });
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() updateRegistrationDto: UpdateRegistrationDto,
  ): Promise<Registration[]> {
    return this.registrationService.update(id, updateRegistrationDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.registrationService.softDelete(id);
  }
}
