import { ExerciseProvider } from './exercise.context';
import ExerciseApp from './exercise.app';
import { ComponentInject } from '@org/ui';
import { CRUDProvider, CRUDTemplate } from '@org/core';

export const ExercisePage = ComponentInject({
  template: [CRUDTemplate],
  providers: [CRUDProvider, ExerciseProvider],
  bootstrap: ExerciseApp,
});
