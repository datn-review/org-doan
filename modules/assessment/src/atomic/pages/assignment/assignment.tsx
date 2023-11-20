import { AssignmentProvider } from './assignment.context';
import AssignmentApp from './assignment.app';
import { ComponentInject } from '@org/ui';
import { CRUDProvider, CRUDTemplate } from '@org/core';

export const AssignmentPage = ComponentInject({
  template: [CRUDTemplate],
  providers: [CRUDProvider, AssignmentProvider],
  bootstrap: AssignmentApp,
});