import { Injectable, OnModuleInit } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { ChatBot } from './entities/chat-bot.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NlpManager, containerBootstrap } from 'node-nlp';
import { BuiltinCompromise } from '@nlpjs/builtin-compromise';
import { Document } from 'langchain/document';
import { CharacterTextSplitter } from 'langchain/text_splitter';
import { HNSWLib } from 'langchain/vectorstores/hnswlib';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';

import * as nlp from 'compromise';
import * as datePlugin from 'compromise-dates';
import { UsersService } from 'src/users/users.service';
import { RoleEnum } from 'src/roles/roles.enum';
export const relations = [
  {
    field: 'tutorCertifications',
    entity: 'tutor_certification',
  },
  {
    field: 'tutor_certification.certification',
    entity: 'certification',
  },
  {
    field: 'tutorSkills',
    entity: 'tutor_skill',
  },
  {
    field: 'tutor_skill.skill',
    entity: 'skill',
  },

  {
    field: 'tutorTimeAvailability',
    entity: 'tutor_time_availability',
  },
  {
    field: 'tutorGradeSubject',
    entity: 'tutor_subject_grade',
  },
  {
    field: 'tutor_subject_grade.subject',
    entity: 'subject',
  },
  {
    field: 'tutor_subject_grade.grade',
    entity: 'gradeLevel',
  },
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
const OPENAI_API_KEY = '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';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nlp?.plugin(datePlugin);
export class ChatBotRepository {}
@Injectable()
export class ChatBotService
  extends BaseService<ChatBot, Repository<ChatBot>, IParams>
  implements OnModuleInit
{
  private readonly manager: NlpManager;
  constructor(
    @InjectRepository(ChatBot) repository: Repository<ChatBot>,
    private readonly usersService: UsersService,
  ) {
    super(repository);

    this.manager = new NlpManager({
      forceNER: true,
      languages: ['en', 'vi'],
    });
    // const container = containerBootstrap();
    // const builtin = new BuiltinCompromise({
    //   enable: [
    //     'hashtags',
    //     'person',
    //     'place',
    //     'organization',
    //     'email',
    //     'phonenumber',
    //     'date',
    //     'url',
    //     'number',
    //     'dimension',
    //   ],
    // });
    // container.register('extract-builtin-??', builtin, true);
  }

  async onModuleInit() {
    await this.trainChatbot();

    // Theo dõi sự thay đổi trong cơ sở dữ liệu và đào tạo lại khi cần
    // const watcher = chokidar.watch('path/to/your/database', { ignoreInitial: true });
    // watcher.on('all', async () => {
    //   console.log('Database changed. Retraining chatbot...');
    //   await this.trainChatbot();
    // });
  }

  async trainChatbot() {
    // Lấy dữ liệu lịch học từ cơ sở dữ liệu
    const data = await this.findManyActive();
    console.log('data', data);

    data.forEach((item) => {
      this.manager.addDocument(item.language, item.input, item.intent);
      this.manager.addAnswer(item.language, item.intent, item.output);
    });

    // Đào tạo chatbot
    await this.manager.train();
  }

  async trainChatbotSearch() {
    // Lấy dữ liệu lịch học từ cơ sở dữ liệu
    const data = await this.usersService.findManyActive(1, relations, [
      {
        field: 'role',
        value: RoleEnum.PESONAL_TUTOR,
      },
    ]);
    console.log('data', data);
    const splitter = new CharacterTextSplitter({
      chunkSize: 1000,
    });
    const docs = await splitter.createDocuments([JSON.stringify(data)]);

    // STEP 4: Generate embeddings from documents
    const vectorStore = await HNSWLib.fromDocuments(
      docs,
      new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY }),
    );

    await vectorStore.save('hnswlib');
  }

  async handleUserRequest({
    userInput,
    userId,
  }: {
    userInput: string;
    userId: number;
  }): Promise<string> {
    console.log(userInput);

    try {
      const [responseVI, responseEN] = await Promise.all([
        this.manager.process('vi', userInput),
        this.manager.process('en', userInput),
      ]);

      // @ts-ignore
      const doc = nlp(userInput);
      // console.log(doc);
      // let dates = doc;
      // console.log(doc?.emails());
      console.log(doc?.json());
      console.log(doc?.dates().get()?.[0]);

      const intent = responseVI.intent || responseEN.intent;
      // console.log(responseVI, responseEN);
      console.log(JSON.stringify(responseVI));

      // Process the responses or return them as needed
      return (
        responseVI.answer || responseEN.answer || "I'm sorry, I didn't understand your request."
      );
    } catch (error) {
      // Handle errors from any of the promises
      console.error('Error:', error);
      throw new Error('Failed to fetch data');
    }
  }
}
