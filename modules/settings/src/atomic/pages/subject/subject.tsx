import { SubjectProvider } from './subject.context';
import SubjectApp from './subject.app';
import { ComponentInject } from '@org/ui';
import { CRUDTemplate } from '../../templates/crud.template';
import { CRUDProvider } from '@org/core';

export const SubjectPage = ComponentInject({
  template: [CRUDTemplate],
  providers: [CRUDProvider, SubjectProvider],
  bootstrap: SubjectApp,
});
