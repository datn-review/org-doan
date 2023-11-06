import { WebAdminProvider } from './web-admin.context';
import WebAdminApp from './web-admin.app';
import { ComponentInject } from '@org/ui';
import { CRUDProvider, CRUDTemplate } from '@org/core';

export const WebAdminPage = ComponentInject({
  template: [CRUDTemplate],
  providers: [CRUDProvider, WebAdminProvider],
  bootstrap: WebAdminApp,
});
