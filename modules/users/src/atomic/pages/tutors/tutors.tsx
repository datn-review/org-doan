import { TutorsProvider } from './tutors.context';
import TutorsApp from './tutors.app';
import { ComponentInject } from '@org/ui';
import { CRUDProvider, CRUDTemplate } from '@org/core';

export const UserTutorsPage = ComponentInject({
  template: [CRUDTemplate],
  providers: [CRUDProvider, TutorsProvider],
  bootstrap: TutorsApp,
});
