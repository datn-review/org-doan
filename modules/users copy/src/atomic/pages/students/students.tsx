import { StudentsProvider } from './students.context';
import StudentsApp from './students.app';
import { ComponentInject } from '@org/ui';

export const StudentsPage = ComponentInject({
  template: [],
  providers: [StudentsProvider],
  bootstrap: StudentsApp,
});
