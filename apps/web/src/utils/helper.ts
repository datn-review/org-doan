export const optionQuestions = (data: any) => {
  return data?.map((item: any) => ({
    value: item.questionNumber,
    key: item.questionNumber,
    name: item.questionNumber,
  }));
};

export const IIFE = (cb: Function) => {
  return cb();
};
export const mergeClassName = (...classNames: (string | boolean | null | undefined)[]): string => {
  return classNames.filter((className) => Boolean(className)).join(' ');
};
