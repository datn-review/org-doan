import { LoginProvider } from './LoginContext';
import LoginApp from './LoginApp';
import { ComponentInject } from '@org/ui';
import { AuthTemplate } from '../../templates';

export const LoginPage = ComponentInject({
  template: [AuthTemplate],
  providers: [LoginProvider],
  bootstrap: LoginApp,
});
