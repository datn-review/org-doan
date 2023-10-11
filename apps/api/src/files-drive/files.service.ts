import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { google } from 'googleapis';
import { AllConfigType } from 'src/config/config.type';
import { Stream } from 'stream';
import { Repository } from 'typeorm';
import { FileEntity } from './entities/file.entity';

const CLIENT_ID = process.env.DRIVE_CLIENT_ID;
const CLIENT_SECRET = process.env.DRIVE_CLIENT_SECRET;
const REDIRECT_URI = process.env.DRIVE_REDIRECT_URI;
const REFRESH_TOKEN = process.env.DRIVE_REFRESH_TOKEN;
const DRIVE_CLIENT_PARENT_FORDER = process.env.DRIVE_CLIENT_PARENT_FORDER;

@Injectable()
export class FilesService {
  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  async uploadFile(file?: Express.Multer.File | null): Promise<any> {
    if (!file) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            file: 'selectFile',
          },
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    const drive = google.drive({
      version: 'v3',
      auth: oauth2Client,
    });
    const dataUploadDrive = await this.uploadFileToDrive({ drive, file });

    return this.fileRepository.save(
      this.fileRepository.create({
        path: dataUploadDrive?.fileId,
      }),
    );
  }
  async setFilePublic(fileId: any, drive: any) {
    try {
      await drive.permissions.create({
        fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });

      const getUrl = await drive.files.get({
        fileId,
        fields: 'webViewLink, webContentLink',
      });

      return getUrl;
    } catch (error) {
      console.error(error);
    }
  }
  async uploadFileToDrive({ drive, file }: any) {
    try {
      const fileObject = file;

      const bufferStream = new Stream.PassThrough();
      bufferStream.end(fileObject.buffer);
      const nameImg = `${file.originalname}-${Date.now()}`;
      const createFile = await drive.files.create({
        // requestBody: {
        //   name: nameImg,
        //   mimeType: file.mimetype,
        // },
        media: {
          mimeType: file.mimetype,
          body: bufferStream,
        },
        resource: {
          name: nameImg,
          parents: [DRIVE_CLIENT_PARENT_FORDER],
        },
        fields: 'id',
      });
      const fileId = createFile.data.id;
      const getUrl = await this.setFilePublic(fileId, drive);

      return {
        fileId,
        url: getUrl.data,
      };
    } catch (error) {
      console.error(error);
    }
  }
  async deleteFile(fileId: any, drive) {
    try {
      console.log('Delete File:::', fileId);
      const deleteFile = await drive.files.delete({
        fileId: fileId,
      });
      console.log(deleteFile.data, deleteFile.status);
    } catch (error) {
      console.error(error);
    }
  }
}
