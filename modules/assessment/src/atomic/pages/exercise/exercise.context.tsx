import { PropsWithChildren, createContext, useContext } from 'react';

export type TExerciseContext = {};

const ExerciseContext = createContext<TExerciseContext>(null as unknown as TExerciseContext);

export const useExerciseContext = () => {
  return useContext(ExerciseContext);
};

export const ExerciseProvider = ({ children }: PropsWithChildren) => {
  const value = {};

  if (!value) return <>Loading...</>;

  return (
    <ExerciseContext.Provider value={value as TExerciseContext}>
      {children}
    </ExerciseContext.Provider>
  );
};
