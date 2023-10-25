import { SkillsProvider } from './skills.context';
import SkillsApp from './skills.app';
import { ComponentInject } from '@org/ui';
import { CRUDTemplate } from '../../templates/crud.template';
import { CRUDProvider } from '@org/core';

export const SkillsPage = ComponentInject({
  template: [CRUDTemplate],
  providers: [CRUDProvider, SkillsProvider],
  bootstrap: SkillsApp,
});
