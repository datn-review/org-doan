import { i18nContant } from '@org/i18n';

export const dataTime = [
  {
    value: 1,
    label: <>30 ${i18nContant('min')}</>,
  },
  {
    value: 2,
    label: <>45 {i18nContant('min')}</>,
  },
  {
    value: 3,
    label: <>60 {i18nContant('min')}</>,
  },
  {
    value: 4,
    label: <>90 {i18nContant('min')}</>,
  },
  {
    value: 5,
    label: <>120 {i18nContant('min')}</>,
  },
  {
    value: 6,
    label: <>150 {i18nContant('min')}</>,
  },
];

export const day = [
  {
    value: 1,
    label: i18nContant('month'),
  },
  {
    value: 2,
    label: i18nContant('week'),
  },
  {
    value: 3,
    label: i18nContant('day'),
  },
];

export const DataTimeEnum: Record<number, JSX.Element> = dataTime.reduce((acc, currentValue) => {
  return { ...acc, [currentValue.value]: currentValue.label };
}, {});
export const DayEnum: Record<number, JSX.Element> = day.reduce((acc, currentValue) => {
  return { ...acc, [currentValue.value]: currentValue.label };
}, {});

export const color = [
  'processing',
  'success',
  'error',
  'warning',
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple',
];
export const colorUser = [
  '#3498db',
  '#e74c3c',
  '#2ecc71',
  '#f39c12',
  '#1abc9c',
  '#9b59b6',
  '#27ae60',
  '#e67e22',
  '#34495e',
  '#f85ff6',
];

export const colorCovert: Record<number, string> = color.reduce((acc, currentValue, index) => {
  return { ...acc, [index]: currentValue };
}, {});

export const colorCovertReverse: Record<number, string> = [...color]
  .reverse()
  .reduce((acc, currentValue, index) => {
    return { ...acc, [index]: currentValue };
  }, {});
export const colorRandom = () => {
  return colorCovert[Math.floor(Math.random() * (color.length - 1))];
};

export const colorUserCovert: Record<number, string> = colorUser.reduce(
  (acc, currentValue, index) => {
    return { ...acc, [index]: currentValue };
  },
  {},
);
export const colorById = (id: number, isReverse = false) => {
  const number = id % 10;
  if (isReverse) {
    return colorCovertReverse[number];
  }
  return colorCovert[number];
};

export const colorByIdUser = (id: number, isReverse = false) => {
  const number = id % 10;
  if (isReverse) {
    return colorUserCovert[number];
  }
  return colorUserCovert[number];
};
