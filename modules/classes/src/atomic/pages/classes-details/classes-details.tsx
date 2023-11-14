import { ClassesDetailsProvider } from './classes-details.context';
import ClassesDetailsApp from './classes-details.app';
import { ComponentInject } from '@org/ui';

export const ClassesDetailsPage = ComponentInject({
  template: [],
  providers: [ClassesDetailsProvider],
  bootstrap: ClassesDetailsApp,
});
