import { ChatBotProvider } from './chat-bot.context';
import ChatBotApp from './chat-bot.app';
import { ComponentInject } from '@org/ui';
import { CRUDProvider, CRUDTemplate } from '@org/core';

export const ChatBotPage = ComponentInject({
  template: [CRUDTemplate],
  providers: [CRUDProvider, ChatBotProvider],
  bootstrap: ChatBotApp,
});
