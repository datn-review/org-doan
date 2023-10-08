import { WebAdminProvider } from './web-admin.context';
import WebAdminApp from './web-admin.app';
import { ComponentInject } from '@org/ui';

export const WebAdminPage = ComponentInject({
  template: [],
  providers: [WebAdminProvider],
  bootstrap: WebAdminApp,
});
