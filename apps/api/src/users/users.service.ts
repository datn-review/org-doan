import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { NullableType } from '../utils/types/nullable.type';
import { RoleEnum } from 'src/roles/roles.enum';
import { FilesService } from './../files-drive/files.service';
import { UpdateUserDto } from './dto/update-user.dto';
interface IUser {
  role: RoleEnum;
  status?: number;
  searchName?: string;
  sortDirection?: string;
  sortBy?: string;
}

type UserICustomer = IUser & IPaginationOptions;
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private filesService: FilesService,
  ) {}

  async create(createProfileDto: CreateUserDto): Promise<User> {
    console.log(createProfileDto?.photo);
    let photo = { id: null };
    if (createProfileDto?.photo) {
      photo = await this.filesService.uploadFile(createProfileDto?.photo);
    }
    return this.usersRepository.save(
      this.usersRepository.create({ ...createProfileDto, photo: photo?.id || null }),
    );
  }

  async findManyWithPagination({
    limit,
    page,
    searchName,
    status,
    role,
    sortBy,
    sortDirection,
  }: UserICustomer): Promise<{ data: User[]; totals: number }> {
    const data: User[] = await this.usersRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: {
        role: true,
        status: true,
      },
      ...(sortBy && {
        order: {
          [sortBy]: sortDirection?.toUpperCase(),
        },
      }),

      where: {
        lastName: Like(`%${searchName}%`),
        // lastName: Like(`%${searchName}%`),

        role: {
          id: role,
        },
        ...(status && {
          status: {
            id: status,
          },
        }),
      },
    });
    const totals = await this.countAllByRoles({ searchName, status, role });

    return { data, totals };
  }
  countAllByRoles({ role, status, searchName }: IUser): Promise<number> {
    return this.usersRepository.count({
      relations: {
        role: true,
        status: true,
      },
      where: {
        firstName: Like(`%${searchName}%`),
        lastName: Like(`%${searchName}%`),
        role: {
          id: role,
        },
        ...(status && {
          status: {
            id: status,
          },
        }),
      },
    });
  }

  findOne(fields: EntityCondition<User>): Promise<NullableType<User>> {
    return this.usersRepository.findOne({
      where: fields,
    });
  }

  async update(id: number, payload: UpdateUserDto): Promise<User> {
    if (payload?.photo) {
      const photo = await this.filesService.uploadFile(payload?.photo);
      return this.usersRepository.save(
        this.usersRepository.create({
          id,
          ...payload,
          photo: photo.id,
        }),
      );
    }
    return this.usersRepository.save(
      this.usersRepository.create({
        id,
        ...payload,
      }),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.usersRepository.softDelete(id);
  }
}
