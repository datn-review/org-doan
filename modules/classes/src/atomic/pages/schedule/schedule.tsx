import { ScheduleProvider } from './schedule.context';
import ScheduleApp from './schedule.app';
import { ComponentInject } from '@org/ui';

export const SchedulePage = ComponentInject({
  template: [],
  providers: [ScheduleProvider],
  bootstrap: ScheduleApp,
});
