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
import { Message } from './entities/message.entity';

import { CreateMessageDto } from './dto/create.dto';
import { UpdateMessageDto } from './dto/update.dto';
import { MessageService } from './message.service';
import { StatusEnum } from 'src/statuses/statuses.enum';

@ApiBearerAuth()
@ApiTags('Message')
@Roles()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'message',
  version: '1',
})
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createMessageDto: CreateMessageDto): Promise<Message[]> {
    return this.messageService.create({
      ...createMessageDto,
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
  ): Promise<InfinityPaginationResultType<Message>> {
    if (limit > 50) {
      limit = 1000;
    }

    return await this.messageService.findManyWithPagination({
      page,
      limit,
      status,
      sortBy,
      sortDirection,
      searchName,
      fieldSearch,
    });
  }

  @Get('/list')
  @HttpCode(HttpStatus.OK)
  getMessages(@Body() room: any) {
    return this.messageService.getMessages(room);
  }

  @Get('/active')
  @HttpCode(HttpStatus.OK)
  getActive(): Promise<Message[]> {
    return this.messageService.findManyActive(StatusEnum['active']);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<Message>> {
    return this.messageService.findOne({ id: +id });
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: number, @Body() updateMessageDto: UpdateMessageDto): Promise<Message[]> {
    return this.messageService.update(id, updateMessageDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.messageService.softDelete(id);
  }
}
