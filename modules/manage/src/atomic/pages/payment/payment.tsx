import { PaymentProvider } from './payment.context';
import PaymentApp from './payment.app';
import { ComponentInject } from '@org/ui';
import { CRUDProvider, CRUDTemplate } from '@org/core';

export const PaymentPage = ComponentInject({
  template: [CRUDTemplate],
  providers: [CRUDProvider, PaymentProvider],
  bootstrap: PaymentApp,
});
