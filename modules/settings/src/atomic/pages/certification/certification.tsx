import { CertificationProvider } from './certification.context';
import CertificationApp from './certification.app';
import { ComponentInject } from '@org/ui';
import { CRUDTemplate } from '../../templates/crud.template';
import { CRUDProvider } from '@org/core';

export const CertificationPage = ComponentInject({
  template: [CRUDTemplate],
  providers: [CRUDProvider, CertificationProvider],
  bootstrap: CertificationApp,
});
