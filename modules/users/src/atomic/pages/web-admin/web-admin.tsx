import { WebAdminProvider } from './web-admin.context';
import WebAdminApp from './web-admin.app';
import { ComponentInject } from '@org/ui';
import { UserTemplate } from '../../templates/user.template';

export const WebAdminPage = ComponentInject({
  template: [UserTemplate],
  providers: [WebAdminProvider],
  bootstrap: WebAdminApp,
});
