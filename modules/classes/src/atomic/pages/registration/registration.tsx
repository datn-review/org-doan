import { RegistrationProvider } from './registration.context';
import RegistrationApp from './registration.app';
import { ComponentInject } from '@org/ui';

export const RegistrationPage = ComponentInject({
  template: [],
  providers: [RegistrationProvider],
  bootstrap: RegistrationApp,
});
