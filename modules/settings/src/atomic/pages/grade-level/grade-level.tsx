import { GradeLevelProvider } from './grade-level.context';
import GradeLevelApp from './grade-level.app';
import { ComponentInject } from '@org/ui';
import { UserTemplate } from '../../templates/user.template';
import { CRUDProvider } from '@org/core';

export const GradeLevelPage = ComponentInject({
  template: [UserTemplate],
  providers: [CRUDProvider, GradeLevelProvider],
  bootstrap: GradeLevelApp,
});
