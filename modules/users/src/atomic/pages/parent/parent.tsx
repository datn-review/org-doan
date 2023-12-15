import { ParentProvider } from './parent.context';
import ParentApp from './parent.app';
import { ComponentInject } from '@org/ui';
import { CRUDProvider, CRUDTemplate } from '@org/core';

export const ParentPage = ComponentInject({
  template: [CRUDTemplate],
  providers: [CRUDProvider, ParentProvider],
  bootstrap: ParentApp,
});
