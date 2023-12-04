import { PropsWithChildren, createContext, useContext } from 'react';

export type TQuestionContext = {};

const QuestionContext = createContext<TQuestionContext>(null as unknown as TQuestionContext);

export const useQuestionContext = () => {
  return useContext(QuestionContext);
};

export const QuestionProvider = ({ children }: PropsWithChildren) => {
  const value = {};

  if (!value) return <>Loading...</>;

  return (
    <QuestionContext.Provider value={value as TQuestionContext}>
      {children}
    </QuestionContext.Provider>
  );
};
