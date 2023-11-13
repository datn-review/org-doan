import { StudentsProvider } from './students.context';
import StudentsApp from './students.app';
import { ComponentInject } from '@org/ui';
import { CRUDProvider, CRUDTemplate } from '@org/core';

export const StudentsPage = ComponentInject({
  template: [CRUDTemplate],
  providers: [CRUDProvider, StudentsProvider],
  bootstrap: StudentsApp,
});
