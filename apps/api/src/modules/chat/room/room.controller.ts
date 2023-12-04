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
import { NullableType } from 'src/utils/types/nullable.type';
import { Room } from './entities/room.entity';
import { UpdateRoomDto } from './dto/update.dto';
import { RoomService } from './room.service';
import { StatusEnum } from 'src/statuses/statuses.enum';

const relations = [
  {
    field: 'owner',
    entity: 'user',
  },
  {
    field: 'members',
    entity: 'room_members_user',
  },
];
@ApiBearerAuth()
@ApiTags('Room')
@Roles()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'room',
  version: '1',
})
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createRoomDto: any, @Request() request): Promise<Room[]> {
    const id = request?.user?.id;

    const members = createRoomDto?.members?.map((member) => ({ id: Number(member) })) || [];

    const body = {
      title: createRoomDto.title,
      owner: id,
      members,
    };
    return this.roomService.create({
      ...body,
    });
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'searchName', required: false })
  @ApiQuery({ name: 'fieldSearch', required: false })
  async findAll(
    @Query('status', new DefaultValuePipe(0), ParseIntPipe) status: number,
    @Query('fieldSearch', new DefaultValuePipe('name')) fieldSearch: string | string[],
    @Query('searchName', new DefaultValuePipe('')) searchName: string,
    @Request() request: any,
  ): Promise<Room[]> {
    const userId = request?.user.id;
    console.log('userId', userId);
    // return this.roomRepository
    //   .createQueryBuilder('room')
    //   .leftJoinAndSelect('room.owner', 'owner')
    //   .leftJoinAndSelect('room.members', 'members')
    //   .where('owner.id = :userId OR members.id = :userId', { userId })
    //   .getMany();
    // return await this.roomService.findManyNoPagination({
    //   searchName: '',
    //   relations,
    //   or: [
    //     [
    //       {
    //         field: 'owner',
    //         value: userId,
    //       },
    //       {
    //         field: 'room_members_user.user_id',
    //         value: userId,
    //       },
    //     ],
    //   ],
    // });
    return this.roomService.findRoomByUser(userId);

    // return await this.roomService.findManyWithPagination({
    //   page,
    //   limit,
    //   status,
    //   sortBy,
    //   sortDirection,
    //   searchName,
    //   fieldSearch,
    // });
  }

  @Get('/active')
  @HttpCode(HttpStatus.OK)
  getActive(): Promise<Room[]> {
    return this.roomService.findManyActive(StatusEnum['active']);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<Room>> {
    return this.roomService.findOne({ id: +id });
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: number, @Body() updateRoomDto: UpdateRoomDto): Promise<Room[]> {
    return this.roomService.update(id, updateRoomDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.roomService.softDelete(id);
  }
}
