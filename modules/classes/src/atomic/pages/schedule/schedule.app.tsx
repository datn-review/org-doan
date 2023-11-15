import React, { useEffect, useState } from 'react';
import {
  Button,
  Calendar,
  H2,
  Input,
  RangePicker,
  Select,
  SIZE,
  Space,
  TimePicker,
  ColorPicker,
} from '@org/ui';
import moment from 'dayjs';
import dayjs from 'dayjs';
import { css } from '@emotion/css';
import { getNameLanguage, useTranslation } from '@org/i18n';
import { COLOR } from '@org/utils';
import { v4 as uuidv4 } from 'uuid';
import { createEventId } from '@org/ui/src/atomic/atoms/calendar/event-utils';

interface ClassTime {
  day?: number;
  start?: string;
  end?: string;
}
const options = [
  {
    label: 'monday',
    value: 1,
  },
  {
    label: 'tuesday',
    value: 2,
  },
  {
    label: 'wednesday',
    value: 3,
  },
  {
    label: 'thursday',
    value: 4,
  },

  {
    label: 'friday',
    value: 5,
  },
  {
    label: 'saturday',
    value: 6,
  },
  {
    label: 'sunday',
    value: 0,
  },
];
const generateWeeklySchedule = (
  startDate: string,
  endDate: string,
  classTimes?: ClassTime[],
  title?: string,
) => {
  if (!classTimes) return null;
  let currentDate = moment(startDate);

  const lastDate = moment(endDate);

  const schedule: any[] = [];
  while (currentDate.isSame(lastDate) || currentDate.isBefore(lastDate)) {
    const dayOfWeek = currentDate.day();

    classTimes?.forEach(({ start, day, end }) => {
      if (day === dayOfWeek) {
        schedule.push({
          id: Math.floor(Math.random() * 200000),
          start: currentDate.format('YYYY-MM-DD') + ' ' + start,
          end: currentDate.format('YYYY-MM-DD') + ' ' + end,
          title,
          backgroundColor: 'red',
          borderColor: 'pink',
          textColor: 'yellow',
        });
      }
    });
    currentDate = currentDate.add(1, 'days');
  }

  return schedule;
};
type ClassRecord = Record<number, any>;

function Schedule({ data }: any) {
  console.log(data);
  const { t } = useTranslation();
  // const input
  const startDate = '2023-11-01';
  const endDate = '2024-01-01';
  const id = createEventId();
  const [classArray, setClassArray] = useState<ClassRecord>({
    [uuidv4()]: { day: undefined, time: '' },
  });
  const [classTimes, setClassTimes] = useState<ClassTime[]>();
  const [title, setTitle] = useState<string>('');
  useEffect(() => {
    let subjectString = '';
    if (data) {
      data?.posts?.subjects?.forEach((subject: any, index: number) => {
        if (index === 0) {
          subjectString = getNameLanguage(subject?.nameVI, subject?.nameEN);
        } else {
          subjectString = subjectString + ' - ' + getNameLanguage(subject?.nameVI, subject?.nameEN);
        }
      });
      setTitle(subjectString + ' - ' + data.user?.lastName + ' ' + data.user?.firstName);
    }
  }, [data]);

  // const classTimes: ClassTime[] = [
  //   { day: 1, start: '07:00', end: '09:00' },
  //   { day: 3, start: '10:00', end: '12:00' },
  // ];
  const format = 'HH:mm';
  const weeklySchedule = generateWeeklySchedule(
    dayjs(data?.contractStartDate).format('YYYY-MM-DD'),
    dayjs(data?.contractEndDate).format('YYYY-MM-DD'),
    classTimes,
    title,
  );
  console.log(dayjs(data?.contractStartDate));

  console.log(weeklySchedule);
  const handleSave = () => {
    const dataCovert: ClassTime[] = Object.entries(classArray).map(([id, values]: any) => {
      return {
        day: values?.day,
        start: values?.time?.[0]?.format(format),
        end: values?.time?.[1]?.format(format),
      };
    });
    setClassTimes([...dataCovert]);
  };

  return (
    <Space className={css``}>
      <H2>{t('create.schedule')}</H2>
      <Space
        className={css`
          display: flex;
          gap: 1rem;
        `}
      >
        <Space
          className={css`
            width: 24rem;
            margin-bottom: 2rem;
          `}
        >
          <Space>Time Start - Time End</Space>
          <RangePicker
            onChange={(value) => console.log(value)}
            disabled={true}
            // @ts-ignore
            value={[dayjs(data?.contractStartDate), dayjs(data?.contractEndDate)]}
            className={css`
              & * {
                color: ${COLOR.Primary} !important;
              }
            `}
          />
        </Space>
        <Space>
          <Space>Title</Space>

          <Input
            name={'title'}
            value={title}
            onChange={(value) => {
              // @ts-ignore
              setTitle(value);
            }}
            className={css`
              height: 32px;
              width: 40rem;
            `}
          />
        </Space>
      </Space>
      <Space
        className={css`
          display: flex;
          gap: 1rem;
        `}
      >
        <ColorPicker showText={(color) => <span>Text Color ({color.toHexString()})</span>} />
        <ColorPicker showText={(color) => <span>BackGround Color ({color.toHexString()})</span>} />
      </Space>

      {Object.entries(classArray)?.map(([id, values]: any, index: number) => {
        return (
          <Space
            className={css`
              display: flex;
              gap: 1rem;
              margin-bottom: 1rem;
            `}
          >
            <Space>
              <div>{t('dayOfWeek')}</div>
              <Select
                className={css`
                  width: 24rem;
                `}
                options={options}
                onChange={(value) =>
                  setClassArray((prev) => ({
                    ...prev,
                    [id]: {
                      ...prev[id],
                      day: value,
                    },
                  }))
                }
                placeholder={t('select.dayOfWeek')}
                size={'middle'}
                value={values?.day}
              />
            </Space>

            <Space>
              <div>Time End - Time End</div>
              <TimePicker.RangePicker
                onChange={(value) =>
                  setClassArray((prev) => ({
                    ...prev,
                    [id]: {
                      ...prev[id],
                      time: value,
                    },
                  }))
                }
                format={format}
                size={'middle'}
                className={css`
                  height: 32px;
                  margin-top: 1px;
                `}
                value={values?.time}
              />
            </Space>
            {index !== 0 && (
              <Space
                className={css`
                  display: flex;
                  align-items: flex-end;
                  //margin-bottom: 0.5rem;
                `}
              >
                <Button
                  onClick={() => {
                    setClassArray((prev) => {
                      delete prev[id];
                      console.log(prev);
                      return { ...prev };
                    });
                  }}
                  $size={SIZE.ExtraSmall}
                >
                  - Remove
                </Button>
              </Space>
            )}
          </Space>
        );
      })}
      <Space>
        <Button
          onClick={() => {
            setClassArray((prev) => ({
              ...prev,
              [uuidv4()]: {
                day: undefined,
                time: '',
              },
            }));
          }}
          $size={SIZE.ExtraSmall}
        >
          + Add
        </Button>
      </Space>
      <Button
        onClick={handleSave}
        className={css`
          margin-top: 1rem;
        `}
      >
        {t('save.schedule')}{' '}
      </Button>

      <Space
        className={css`
          flex: 1;
        `}
      >
        <Calendar initData={weeklySchedule} />
      </Space>
    </Space>
  );
}

export default Schedule;
