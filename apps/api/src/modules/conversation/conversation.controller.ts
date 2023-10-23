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
import { InfinityPaginationResultType } from '../../utils/types/infinity-pagination-result.type';
import { NullableType } from '../../utils/types/nullable.type';
import { Conversation } from './entities/conversation.entity';

import { CreateConversationDto } from './dto/create.dto';
import { UpdateConversationDto } from './dto/update.dto';
import { ConversationService } from './conversation.service';
import { StatusEnum } from 'src/statuses/statuses.enum';

@ApiBearerAuth()
@ApiTags('Conversation')
@Roles(RoleEnum.WEB_ADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'conversation',
  version: '1',
})
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createConversationDto: CreateConversationDto): Promise<Conversation[]> {
    return this.conversationService.create({
      ...createConversationDto,
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
  ): Promise<InfinityPaginationResultType<Conversation>> {
    if (limit > 50) {
      limit = 1000;
    }

    return await this.conversationService.findManyWithPagination({
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
  getActive(): Promise<Conversation[]> {
    return this.conversationService.findManyActive(StatusEnum['active']);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<Conversation>> {
    return this.conversationService.findOne({ id: +id });
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() updateConversationDto: UpdateConversationDto,
  ): Promise<Conversation[]> {
    return this.conversationService.update(id, updateConversationDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.conversationService.softDelete(id);
  }
}
