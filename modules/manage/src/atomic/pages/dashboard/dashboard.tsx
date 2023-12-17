import { DashboardProvider } from './dashboard.context';
import DashboardApp from './dashboard.app';
import { ComponentInject } from '@org/ui';
import { CRUDProvider, CRUDTemplate } from '@org/core';

export const DashboardPage = ComponentInject({
  template: [CRUDTemplate],
  providers: [CRUDProvider, DashboardProvider],
  bootstrap: DashboardApp,
});
