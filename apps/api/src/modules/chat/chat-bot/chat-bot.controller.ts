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
import { RoleEnum } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { InfinityPaginationResultType } from 'src/utils/types/infinity-pagination-result.type';
import { NullableType } from 'src/utils/types/nullable.type';
import { ChatBot } from './entities/chat-bot.entity';

import { CreateChatBotDto } from './dto/create.dto';
import { UpdateChatBotDto } from './dto/update.dto';
import { ChatBotService } from './chat-bot.service';
import { StatusEnum } from 'src/statuses/statuses.enum';

@ApiBearerAuth()
@ApiTags('ChatBot')
@Roles()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'chat-bot',
  version: '1',
})
export class ChatBotController {
  constructor(private readonly chatBotService: ChatBotService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createChatBotDto: any): Promise<ChatBot[]> {
    return this.chatBotService.create({
      ...createChatBotDto,
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
    @Query('sortBy', new DefaultValuePipe('intent')) sortBy: string,
    @Query('sortDirection', new DefaultValuePipe('ASC')) sortDirection: string,
    @Query('status', new DefaultValuePipe(0), ParseIntPipe) status: number,
    @Query('fieldSearch', new DefaultValuePipe('intent')) fieldSearch: string | string[],
    @Query('searchName', new DefaultValuePipe('')) searchName: string,
  ): Promise<InfinityPaginationResultType<ChatBot>> {
    if (limit > 50) {
      limit = 1000;
    }

    return await this.chatBotService.findManyWithPagination({
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
  getActive(): Promise<ChatBot[]> {
    return this.chatBotService.findManyActive(StatusEnum['active']);
  }

  @Get('/request')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'userInput', required: false })
  async userRequest(
    @Query('userInput', new DefaultValuePipe('')) userInput: string,
    @Request() request,
  ): Promise<string> {
    const userId = request.user.id;
    return this.chatBotService.handleUserRequest({ userInput, userId });
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<ChatBot>> {
    return this.chatBotService.findOne({ id: +id });
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: number, @Body() updateChatBotDto: any): Promise<ChatBot[]> {
    return this.chatBotService.update(id, updateChatBotDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.chatBotService.softDelete(id);
  }
}
