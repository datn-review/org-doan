import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { FilesModule } from './../files-drive/files.module';
import { UsersTutorController, UsersAdminController } from './controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), FilesModule],
  controllers: [UsersAdminController, UsersTutorController],
  providers: [IsExist, IsNotExist, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
