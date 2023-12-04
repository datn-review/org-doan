import { QuestionProvider } from './question.context';
import QuestionApp from './question.app';
import { ComponentInject } from '@org/ui';
import { CRUDProvider, CRUDTemplate } from '@org/core';

export const QuestionPage = ComponentInject({
  template: [CRUDTemplate],
  providers: [CRUDProvider, QuestionProvider],
  bootstrap: QuestionApp,
});
