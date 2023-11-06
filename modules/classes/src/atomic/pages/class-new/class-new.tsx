import { ClassNewProvider } from './class-new.context';
import ClassNewApp from './class-new.app';
import { ComponentInject } from '@org/ui';

export const ClassNewPage = ComponentInject({
  template: [],
  providers: [ClassNewProvider],
  bootstrap: ClassNewApp,
});
