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
import { PostSkills } from './entities/post-skills.entity';

import { CreatePostSkillsDto } from './dto/create.dto';
import { UpdatePostSkillsDto } from './dto/update.dto';
import { PostSkillsService } from './post-skills.service';
import { StatusEnum } from 'src/statuses/statuses.enum';

@ApiBearerAuth()
@ApiTags('PostSkills')
@Roles(RoleEnum.WEB_ADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'post-skills',
  version: '1',
})
export class PostSkillsController {
  constructor(private readonly postSkillsService: PostSkillsService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPostSkillsDto: CreatePostSkillsDto): Promise<PostSkills[]> {
    return this.postSkillsService.create({
      ...createPostSkillsDto,
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
  ): Promise<InfinityPaginationResultType<PostSkills>> {
    if (limit > 50) {
      limit = 1000;
    }

    return await this.postSkillsService.findManyWithPagination({
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
  getActive(): Promise<PostSkills[]> {
    return this.postSkillsService.findManyActive(StatusEnum['active']);
  }

  // @Get('/:id')
  // @HttpCode(HttpStatus.OK)
  // findOne(@Param('id') id: string): Promise<NullableType<PostSkills>> {
  //   return this.postSkillsService.findOne({ id: +id });
  // }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() updatePostSkillsDto: UpdatePostSkillsDto,
  ): Promise<PostSkills[]> {
    return this.postSkillsService.update(id, updatePostSkillsDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.postSkillsService.softDelete(id);
  }
}
