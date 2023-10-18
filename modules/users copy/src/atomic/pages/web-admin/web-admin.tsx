import { WebAdminProvider } from './web-admin.context';
import WebAdminApp from './web-admin.app';
import { ComponentInject } from '@org/ui';
import { UserTemplate } from '../../templates/user.template';
import { CRUDProvider } from '@org/core';

export const WebAdminPage = ComponentInject({
  template: [UserTemplate],
  providers: [CRUDProvider, WebAdminProvider],
  bootstrap: WebAdminApp,
});
