import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
  SerializeOptions,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { User } from '../entities/user.entity';
import { InfinityPaginationResultType } from '../../utils/types/infinity-pagination-result.type';
import { NullableType } from '../../utils/types/nullable.type';
import { FileInterceptor } from '@nestjs/platform-express';
@ApiBearerAuth()
@ApiTags('User Tutor')
@Roles(RoleEnum.WEB_ADMIN)
@Roles(RoleEnum.WEB_STAFF)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'users/tutor',
  version: '1',
})
export class UsersTutorController {
  constructor(private readonly usersService: UsersService) {}

  @SerializeOptions({
    groups: ['admin'],
  })
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('photo'))
  create(
    @UploadedFile() photo: Express.Multer.File,
    @Body() createProfileDto: CreateUserDto,
  ): Promise<User> {
    return this.usersService.create({
      ...createProfileDto,
      photo: photo,
      role: {
        id: RoleEnum.WEB_ADMIN,
      },
    });
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get('/')
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('status', new DefaultValuePipe(10), ParseIntPipe) status: number,
    @Query('searchName', new DefaultValuePipe('')) searchName: string,
    @Query('sortBy', new DefaultValuePipe(10)) sortBy: string,
    @Query('sortDirection', new DefaultValuePipe(10)) sortDirection: string,
  ): Promise<InfinityPaginationResultType<User>> {
    if (limit > 50) {
      limit = 50;
    }

    return await this.usersService.findManyWithPagination({
      page,
      limit,
      sortBy,
      sortDirection,
      status,
      role: RoleEnum.PESONAL_TUTOR,
      searchName,
    });
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<User>> {
    return this.usersService.findOne({ id: +id });
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('photo'))
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id') id: number,
    @Body() updateProfileDto: UpdateUserDto,
    @UploadedFile() photo: Express.Multer.File,
  ): Promise<User> {
    return this.usersService.update(id, { ...updateProfileDto, photo: photo });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.softDelete(id);
  }
}