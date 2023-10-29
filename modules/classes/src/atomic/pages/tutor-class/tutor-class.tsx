import { TutorClassProvider } from './tutor-class.context';
import TutorClassApp from './tutor-class.app';
import { ComponentInject } from '@org/ui';

export const TutorClassPage = ComponentInject({
  template: [],
  providers: [TutorClassProvider],
  bootstrap: TutorClassApp,
});
