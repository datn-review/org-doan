import { RegisterProvider } from './RegisterContext';
import RegisterApp from './RegisterApp';
import { ComponentInject } from '@org/ui';
import { AuthTemplate } from '../../templates';

export const RegisterPage = ComponentInject({
  template: [AuthTemplate],
  providers: [RegisterProvider],
  bootstrap: RegisterApp,
});
