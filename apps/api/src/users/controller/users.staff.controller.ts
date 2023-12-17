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
  SerializeOptions,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesService } from 'src/files-drive/files.service';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { InfinityPaginationResultType } from '../../utils/types/infinity-pagination-result.type';
import { NullableType } from '../../utils/types/nullable.type';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
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
@ApiTags('User Staff')
@Roles(RoleEnum.WEB_ADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller({
  path: 'users/staff',
  version: '1',
})
export class UsersStaffController {
  postSkillsService: any;
  constructor(
    private readonly usersService: UsersService,

    private readonly filesService: FilesService,
  ) {}

  @SerializeOptions({
    groups: ['admin'],
  })
  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('photo'))
  async create(
    @UploadedFile() photo: Express.Multer.File,
    @Body() createProfileDto: CreateUserDto,
  ): Promise<User[]> {
    let photoCheck = { id: null };
    if (photo) {
      photoCheck = await this.filesService.uploadFile(photo);
    }

    const user = await this.usersService.create({
      ...createProfileDto,
      photo: photoCheck.id || null,
      role: {
        id: RoleEnum.WEB_STAFF,
      },
    });

    return user;
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
    @Query('fieldSearch', new DefaultValuePipe(['lastName', 'firstName']))
    fieldSearch: string | string[],
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
      searchName,
      fieldSearch,
      where: [
        {
          field: 'role',
          value: RoleEnum.WEB_STAFF,
        },
      ],
      relations,
    });
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<NullableType<User>> {
    return this.usersService.findOne(
      {
        id: +id,
      },
      relations,
    );
  }

  @SerializeOptions({
    groups: ['admin'],
  })
  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('photo'))
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: number,
    @Body() updateProfileDto: UpdateUserDto,
    @UploadedFile() photo: Express.Multer.File,
  ): Promise<User[]> {
    if (photo) {
      const photoResult = await this.filesService.uploadFile(photo);

      return this.usersService.update(id, { ...updateProfileDto, photo: photoResult.id });
    }
    return this.usersService.update(id, { ...updateProfileDto });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.softDelete(id);
  }
}
