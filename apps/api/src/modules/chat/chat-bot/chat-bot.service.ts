import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RetrievalQAChain, loadQARefineChain } from 'langchain/chains';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { CharacterTextSplitter } from 'langchain/text_splitter';
import { NlpManager } from 'node-nlp';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { ChatBot } from './entities/chat-bot.entity';

import { OpenAI } from 'langchain/llms/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const translate = require('@iamtraction/google-translate');

import * as nlp from 'compromise';
import * as datePlugin from 'compromise-dates';
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import { LessonsService } from 'src/modules/lessons/lessons.service';
import { RoleEnum } from 'src/roles/roles.enum';
import { UsersService } from 'src/users/users.service';
import { isEmpty } from 'lodash';

dayjs.extend(timezone);

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
  {
    field: 'collaboration',
    entity: 'collaboration',
  },
  {
    field: 'collaboration.feedback',
    entity: 'feedback',
  },
];
const OPENAI_API_KEY = process.env.KEY_OPEN_AI;

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
  private readonly model: any;
  private vectorStore: any;
  private inputDocs: any;
  private chain: any;

  constructor(
    @InjectRepository(ChatBot) repository: Repository<ChatBot>,
    private readonly usersService: UsersService,
    private readonly lessonsService: LessonsService,
  ) {
    super(repository);

    this.manager = new NlpManager({
      forceNER: true,
      languages: ['en', 'vi'],
    });
    this.model = new OpenAI({
      openAIApiKey: OPENAI_API_KEY,
      temperature: 0.9,
      modelName: 'gpt-3.5-turbo',

      // maxTokens: 4000,
    });
  }

  async onModuleInit() {
    await this.trainChatbot();
    await this.trainChatbotSearch();
    // Theo dõi sự thay đổi trong cơ sở dữ liệu và đào tạo lại khi cần
    // const watcher = chokidar.watch('path/to/your/database', { ignoreInitial: true });
    // watcher.on('all', async () => {
    //   console.log('Database changed. Retraining chatbot...');
    //   await this.trainChatbot();
    // });
  }

  async trainChatbot() {
    const data = await this.findManyActive();
    // console.log('data', data);

    data.forEach((item) => {
      this.manager.addDocument(item.language, item.input, item.intent);
      this.manager.addAnswer(item.language, item.intent, item.output);
    });

    await this.manager.train();
  }

  async trainChatbotSearch() {
    const data = await this.usersService.findManyActive(1, relations, [
      {
        field: 'role',
        value: RoleEnum.PESONAL_TUTOR,
      },
    ]);
    console.log('🚀 ~ file: chat-bot.service.ts:154 ~ data?.forEach ~ data:', data?.[0]);
    let stringTrain = '';
    const dataMap = data.map((item) => {
      let length = 0;
      let starSum = 0;

      item.collaboration?.forEach((collaboration) => {
        const feedback = collaboration?.feedback?.[0];
        if (!isEmpty(feedback)) {
          length++;
          const sumFeedback =
            feedback?.overallRating +
            feedback?.interactionRating +
            feedback?.qualityRatting +
            feedback?.contentRatting +
            feedback?.presentationRating;
          starSum = starSum + sumFeedback / 5;
        }
      });

      return {
        ...item,
        collaboration: null,
        star: length === 0 ? 0 : (starSum / length).toFixed(1),
      };
    });
    dataMap?.forEach((item, index) => {
      const nameCertifications = item?.tutorCertifications?.reduce((acc, cert) => {
        return (acc = `${acc + ' - ' + cert?.certification?.nameVI}`);
      }, '');
      const tutorSkills = item?.tutorSkills?.reduce((acc, cert) => {
        return (acc = `${acc + ' - ' + cert?.skill?.nameVI},`);
      }, '');
      const tutorGradeSubject = item?.tutorGradeSubject?.reduce((acc, cert) => {
        return `${acc + ' - ' + cert?.subject?.nameVI} ${
          cert?.grade?.id === 0 ? 'tất cả lớp' : cert?.grade?.nameVI
        },
        `;
      }, '');
      const name = `Gia sư ${index + 1}: Họ và tên:${item.lastName} ${item.firstName}`;
      const birthday = item.birthday ? `sinh năm: ${item.birthday},` : '';
      const school = item.school ? `học trường: ${item.school},` : '';
      const bio = item.bio ? `giới thiệu: ${item.bio},` : '';
      const certifications = nameCertifications ? `chứng chỉ: ${nameCertifications},` : '';
      const Skills = tutorSkills ? `kỹ năng: ${tutorSkills},` : '';
      const gradeSubject = tutorGradeSubject ? `nhận dạy lớp: ${tutorGradeSubject},` : '';

      const star = item?.star ? `được đánh giá ${item?.star}/5 sao` : '';
      const address = item.address
        ? `địa chỉ: ${item.address},${item?.wards?.name},${item?.wards?.districts.name},${item?.wards?.districts?.province?.name},`
        : '';

      stringTrain =
        stringTrain +
        `${name}${birthday}${address}${school}${bio}${certifications}${Skills}${gradeSubject}${star}\n`;
    });
    console.log(
      '🚀 ~ file: chat-bot.service.ts:154 ~ trainChatbotSearch ~ stringTrain:',
      stringTrain,
    );

    const splitter = new CharacterTextSplitter({
      separator: '\n',
      chunkSize: 7,
      chunkOverlap: 3,
    });
    const docs = await splitter.createDocuments([stringTrain]);
    this.inputDocs = docs;
    // STEP 4: Generate embeddings from documents
    this.vectorStore = await MemoryVectorStore.fromDocuments(
      docs,
      new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY }),
    );
    this.chain = new RetrievalQAChain({
      combineDocumentsChain: loadQARefineChain(this.model),
      retriever: this.vectorStore.asRetriever(),
      // prompt: chatPrompt,
    });

    // await vectorStore.save('data');
  }

  async handleUserRequest({
    userInput,
    userId,
  }: {
    userInput: string;
    userId: number;
  }): Promise<string> {
    // console.log(userInput);

    try {
      const [responseVI, responseEN] = await Promise.all([
        this.manager.process('vi', userInput),
        this.manager.process('en', userInput),
      ]);

      const intent = responseVI.intent || responseEN.intent;
      // let dataAns = '';
      if (intent.includes('schedule')) {
        const res = await translate(userInput, { from: 'vi', to: 'en' });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // const doc = nlp(res?.text);
        // const dates = doc.dates();
        // dates.format('{month} {date-ordinal}');
        // console.log(dates.text());

        const response = await this.manager.process('en', res.text);
        // console.log('🚀 ~ file: chat-bot.service.ts:196 ~ response:', response);
        const dataFind = response.entities?.find((item) => {
          return item?.entity === 'date' || item?.entity === 'daterange';
        });
        if (dataFind.resolution) {
          let startDay = undefined;
          let endDay = undefined;
          if (dataFind?.entity === 'date') {
            startDay = dataFind?.resolution?.date;
          }
          if (dataFind?.entity === 'daterange') {
            startDay = dataFind?.resolution?.start;
            endDay = dataFind?.resolution?.end;
          }

          const date = await this.lessonsService.findDay(startDay, endDay, userId);
          console.log('🚀 ~ file: chat-bot.service.ts:228 ~ date:', date.data);

          const dateStr = date?.data?.reduce((acc, cert) => {
            let lessonStart = '';
            const date = new Date(cert.lessonStart);
            const yyyy = date.getFullYear();
            const mm = date.getMonth() + 1;
            const dd = date.getDate();
            const dateStrFormat = dd + '-' + mm + '-' + yyyy;
            const hour = date.getHours();
            const min = date.getMinutes();
            const time = hour + ':' + min;
            if (dataFind?.entity === 'date') {
              lessonStart = `${cert.nameClass}: ${time}`;
            } else {
              lessonStart = `${cert.nameClass}: ${dateStrFormat} ${time}`;
            }

            return `${acc + ' - ' + lessonStart}.\n`;
          }, '');
          let textAns = responseVI.answer || responseEN.answer;
          textAns = textAns + ` (${date?.string}): \n${dateStr}`;

          return textAns;
        }
        // return 'Nôi Dung Bạn Hỏi Không Thuộc Trong Phạm Vi Của Chatbot';
      }
      // console.log(responseVI, responseEN);
      // console.log(JSON.stringify(responseVI));

      const result = await this.chain.call({
        // input_document: this.inputDocs,
        query: `${userInput}, trả lời bằng tiếng việt`,
        max_token_limit: 100,
        input_language: 'vietnamese',
        output_language: 'vietnamese',
      });
      console.log('🚀 ~ file: chat-bot.service.ts:257 ~ result:', result);

      return result?.output_text || 'Hông hiểu gì luôn';
    } catch (error) {
      // Handle errors from any of the promises
      console.error('Error:', error);
      throw new Error('Failed to fetch data');
    }
  }
}
