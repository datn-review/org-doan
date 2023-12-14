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
    field: 'user.photo',
    entity: 'file',
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
  async create(@Body() createRoomDto: any, @Request() request): Promise<any> {
    const id = request?.user?.id;

    const members = createRoomDto?.members?.map((member) => ({ id: Number(member) })) || [];

    const body = {
      title: createRoomDto?.title,
      owner: id,
      members,
    };
    return (await this.roomService.create({
      ...body,
    })) as unknown as Room;
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
  ): Promise<any[]> {
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
    const room = await this.roomService.findRoomByUser(userId);
    const dataMap = room
      ?.map((item) => {
        const isSingle = item?.members?.length == 1;
        let friends: any = null;
        let me: any = null;
        if (item?.owner?.id === userId) {
          me = { ...item?.owner };
          friends = [...item.members];
        } else {
          me = { ...item?.members?.find((member) => member.id === userId) };
          friends = [item.owner, ...item.members.filter((member) => member.id !== userId)];
        }

        return {
          ...item,
          isSingle,
          me,
          friends,
        };
      })
      .filter(
        (item) =>
          item?.messages?.length > 0 || item?.owner?.id === userId || item?.members?.length > 1,
      );

    console.log('🚀 ~ file: room.controller.ts:132 ~ RoomController ~ dataMap:', dataMap);
    return dataMap;
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
