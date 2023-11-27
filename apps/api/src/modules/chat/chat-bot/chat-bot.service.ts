import { Injectable, OnModuleInit } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { IParams } from 'src/core/i.base.service';
import { Repository } from 'typeorm';
import { ChatBot } from './entities/chat-bot.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NlpManager, containerBootstrap } from 'node-nlp';
import { BuiltinCompromise } from '@nlpjs/builtin-compromise';

import * as nlp from 'compromise';
import * as datePlugin from 'compromise-dates';

// @ts-ignore

// @ts-ignore
nlp?.plugin(datePlugin);
export class ChatBotRepository {}
@Injectable()
export class ChatBotService
  extends BaseService<ChatBot, Repository<ChatBot>, IParams>
  implements OnModuleInit
{
  private readonly manager: NlpManager;
  constructor(@InjectRepository(ChatBot) repository: Repository<ChatBot>) {
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
