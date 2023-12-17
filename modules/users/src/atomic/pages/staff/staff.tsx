import { StaffProvider } from './staff.context';
import StaffApp from './staff.app';
import { ComponentInject } from '@org/ui';
import { CRUDProvider, CRUDTemplate } from '@org/core';

export const StaffPage = ComponentInject({
  template: [CRUDTemplate],
  providers: [CRUDProvider, StaffProvider],
  bootstrap: StaffApp,
});
