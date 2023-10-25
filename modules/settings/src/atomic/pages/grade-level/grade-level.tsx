import { GradeLevelProvider } from './grade-level.context';
import GradeLevelApp from './grade-level.app';
import { ComponentInject } from '@org/ui';
import { CRUDTemplate } from '../../templates/crud.template';
import { CRUDProvider } from '@org/core';

export const GradeLevelPage = ComponentInject({
  template: [CRUDTemplate],
  providers: [CRUDProvider, GradeLevelProvider],
  bootstrap: GradeLevelApp,
});
