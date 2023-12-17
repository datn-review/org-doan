import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { NullableType } from '../../utils/types/nullable.type';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';
const relations = [
  {
    field: 'status',
    entity: 'status',
  },
  {
    field: 'photo',
    entity: 'photo',
  },
  {
    field: 'wards',
    entity: 'wards',
  },
  {
    field: 'wards.districts',
    entity: 'districts',
  },
  {
    field: 'districts.province',
    entity: 'province',
  },
];
@ApiBearerAuth()
@ApiTags('Users')
@Roles()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  postSkillsService: any;
  constructor(private readonly usersService: UsersService) {}

  @Get('/active')
  @HttpCode(HttpStatus.OK)
  users(): Promise<NullableType<User[]>> {
    return this.usersService.findManyActive(1, relations);
  }
  @Get('/')
  @HttpCode(HttpStatus.OK)
  usersAll(): Promise<NullableType<User[]>> {
    return this.usersService.findMany(0, relations);
  }
}
