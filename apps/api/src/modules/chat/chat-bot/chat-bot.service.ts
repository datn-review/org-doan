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
import { RetrievalQAChain, VectorDBQAChain, loadQARefineChain } from 'langchain/chains';
import { OpenAI } from 'langchain/llms/openai';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const translate = require('@iamtraction/google-translate');

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

  constructor(
    @InjectRepository(ChatBot) repository: Repository<ChatBot>,
    private readonly usersService: UsersService,
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
      maxTokens: 4000,
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
    await this.trainChatbotSearch();
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
    console.log('🚀 ~ file: chat-bot.service.ts:77 ~ OPENAI_API_KEY:', OPENAI_API_KEY);
    console.log('data', 'Pham Thanh Tam Sinh Nam 2001');
    const splitter = new CharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 0,
    });
    const docs = await splitter.createDocuments([JSON.stringify('Pham Thanh Tam Sinh Nam 2001')]);
    this.inputDocs = docs;
    // STEP 4: Generate embeddings from documents
    this.vectorStore = await MemoryVectorStore.fromDocuments(
      docs,
      new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY }),
    );

    // await vectorStore.save('data');
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

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore

      const intent = responseVI.intent || responseEN.intent;
      if (responseEN.intent) {
        translate(userInput, { from: 'vi', to: 'en' })
          .then(async (res) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
            const doc = nlp(res?.text);
            // console.log(doc);
            // let dates = doc;
            // console.log(doc?.emails());
            console.log(doc?.json());
            console.log(doc?.dates().get());
      
            console.log(res.text);
            const response = await this.manager.process('en', res.text);
            console.log('🚀 ~ file: chat-bot.service.ts:208 ~ .then ~ response:', response.resolution);
          })
          .catch((err) => {
            console.error(err);
          });
      }
      // console.log(responseVI, responseEN);
      console.log(JSON.stringify(responseVI));
      // const llm = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY });

      // this.vectorStore = await HNSWLib.load(
      //   'data',
      //   new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY }),

      // );

      // STEP 2: Create the chain
      // console.log(this.vectorStore);
      const chain = new RetrievalQAChain({
        combineDocumentsChain: loadQARefineChain(this.model),
        retriever: this.vectorStore.asRetriever(),
      });
      // const chain = VectorDBQAChain.fromLLM(this.model, this.vectorStore);

      // STEP 3: Get the answer
      const result = await chain.call({
        input_document: this.inputDocs,
        query: userInput,
      });
      // console.log(result);
      // Process the responses or return them as needed
      return (
        result?.output_text ||
        responseVI.answer ||
        responseEN.answer ||
        "I'm sorry, I didn't understand your request."
      );
    } catch (error) {
      // Handle errors from any of the promises
      console.error('Error:', error);
      throw new Error('Failed to fetch data');
    }
  }
}
