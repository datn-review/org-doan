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
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import { PostTimeAvailability } from './entities/post-time-availability.entity';

import { StatusEnum } from 'src/statuses/statuses.enum';
import { CreatePostTimeAvailabilityDto } from './dto/create.dto';
import { UpdatePostTimeAvailabilityDto } from './dto/update.dto';
import { PostTimeAvailabilityService } from './post-time-availability.service';

@ApiBearerAuth()
@ApiTags('PostTimeAvailability')
@Roles(RoleEnum.WEB_ADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'post-time-availability',
  version: '1',
})
export class PostTimeAvailabilityController {
  constructor(private readonly postTimeAvailabilityService: PostTimeAvailabilityService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createPostTimeAvailabilityDto: CreatePostTimeAvailabilityDto,
  ): Promise<PostTimeAvailability[]> {
    return this.postTimeAvailabilityService.create({
      ...createPostTimeAvailabilityDto,
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
    @Query('sortBy', new DefaultValuePipe('name')) sortBy: string,
    @Query('sortDirection', new DefaultValuePipe('ASC')) sortDirection: string,
    @Query('status', new DefaultValuePipe(0), ParseIntPipe) status: number,
    @Query('fieldSearch', new DefaultValuePipe('name')) fieldSearch: string | string[],
    @Query('searchName', new DefaultValuePipe('')) searchName: string,
  ): Promise<InfinityPaginationResultType<PostTimeAvailability>> {
    if (limit > 50) {
      limit = 1000;
    }

    return await this.postTimeAvailabilityService.findManyWithPagination({
      page,
      limit,
      status,
      sortBy,
      sortDirection,
      searchName,
      fieldSearch,
      relations: ['post_skills'],
    });
  }

  @Get('/active')
  @HttpCode(HttpStatus.OK)
  getActive(): Promise<PostTimeAvailability[]> {
    return this.postTimeAvailabilityService.findManyActive(StatusEnum['active']);
  }

  // @Get('/:id')
  // @HttpCode(HttpStatus.OK)
  // findOne(@Param('id') id: string): Promise<NullableType<PostTimeAvailability>> {
  //   return this.postTimeAvailabilityService.findOne({ id: +id });
  // }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() updatePostTimeAvailabilityDto: UpdatePostTimeAvailabilityDto,
  ): Promise<PostTimeAvailability[]> {
    return this.postTimeAvailabilityService.update(id, updatePostTimeAvailabilityDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.postTimeAvailabilityService.softDelete(id);
  }
}
