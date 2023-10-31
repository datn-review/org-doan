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
import { PostCertification } from './entities/post-certification.entity';

import { CreatePostCertificationDto } from './dto/create.dto';
import { UpdatePostCertificationDto } from './dto/update.dto';
import { PostCertificationService } from './post-certification.service';
import { StatusEnum } from 'src/statuses/statuses.enum';

@ApiBearerAuth()
@ApiTags('PostCertification')
@Roles(RoleEnum.WEB_ADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'post-certification',
  version: '1',
})
export class PostCertificationController {
  constructor(private readonly postCertificationService: PostCertificationService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createPostCertificationDto: CreatePostCertificationDto,
  ): Promise<PostCertification[]> {
    return this.postCertificationService.create({
      ...createPostCertificationDto,
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
  ): Promise<InfinityPaginationResultType<PostCertification>> {
    if (limit > 50) {
      limit = 1000;
    }

    return await this.postCertificationService.findManyWithPagination({
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
  getActive(): Promise<PostCertification[]> {
    return this.postCertificationService.findManyActive(StatusEnum['active']);
  }

  // @Get('/:id')
  // @HttpCode(HttpStatus.OK)
  // findOne(@Param('id') id: string): Promise<NullableType<PostCertification>> {
  //   return this.postCertificationService.findOne({ id: +id });
  // }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() updatePostCertificationDto: UpdatePostCertificationDto,
  ): Promise<PostCertification[]> {
    return this.postCertificationService.update(id, updatePostCertificationDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.postCertificationService.softDelete(id);
  }
}
