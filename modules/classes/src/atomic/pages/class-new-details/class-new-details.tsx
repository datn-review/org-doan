import { ClassNewDetailsProvider } from './class-new-details.context';
import ClassNewDetailsApp from './class-new-details.app';
import { ComponentInject } from '@org/ui';

export const ClassNewDetailsPage = ComponentInject({
  template: [],
  providers: [ClassNewDetailsProvider],
  bootstrap: ClassNewDetailsApp,
});
