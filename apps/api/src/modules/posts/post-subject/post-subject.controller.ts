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
import { NullableType } from 'src/utils/types/nullable.type';
import { PostSubject } from './entities/post-subject.entity';

import { CreatePostSubjectDto } from './dto/create.dto';
import { UpdatePostSubjectDto } from './dto/update.dto';
import { PostSubjectService } from './post-subject.service';
import { StatusEnum } from 'src/statuses/statuses.enum';

@ApiBearerAuth()
@ApiTags('PostSubject')
@Roles(RoleEnum.WEB_ADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'post-subject',
  version: '1',
})
export class PostSubjectController {
  constructor(private readonly postSubjectService: PostSubjectService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPostSubjectDto: CreatePostSubjectDto): Promise<PostSubject[]> {
    return this.postSubjectService.create({
      ...createPostSubjectDto,
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
  ): Promise<InfinityPaginationResultType<PostSubject>> {
    if (limit > 50) {
      limit = 1000;
    }

    return await this.postSubjectService.findManyWithPagination({
      page,
      limit,
      status,
      sortBy,
      sortDirection,
      searchName,
      fieldSearch,
    });
  }

  @Get('/active')
  @HttpCode(HttpStatus.OK)
  getActive(): Promise<PostSubject[]> {
    return this.postSubjectService.findManyActive(StatusEnum['active']);
  }

  // @Get('/:id')
  // @HttpCode(HttpStatus.OK)
  // findOne(@Param('id') id: string): Promise<NullableType<PostSubject>> {
  //   return this.postSubjectService.findOne({ id: +id });
  // }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() updatePostSubjectDto: UpdatePostSubjectDto,
  ): Promise<PostSubject[]> {
    return this.postSubjectService.update(id, updatePostSubjectDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.postSubjectService.softDelete(id);
  }
}
