import { RegistrationPostProvider } from './registration-post.context';
import RegistrationPostApp from './registration-post.app';
import { ComponentInject } from '@org/ui';

export const RegistrationPostPage = ComponentInject({
  template: [],
  providers: [RegistrationPostProvider],
  bootstrap: RegistrationPostApp,
});
