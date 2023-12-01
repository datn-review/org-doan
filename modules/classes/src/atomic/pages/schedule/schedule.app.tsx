import React, { useEffect, useMemo, useState } from 'react';
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
import {getNameLanguage, i18nContant, useTranslation} from '@org/i18n';
import { COLOR } from '@org/utils';
import { v4 as uuidv4 } from 'uuid';
import { createEventId } from '@org/ui/src/atomic/atoms/calendar/event-utils';
import { useCreateLessonDefaultMutation } from '@org/store';
import { isEmpty } from 'lodash';
import { Popover } from '@org/ui';
import { timePickerCss } from './schedule.styled';
import { Event } from './container/Event';
import { If, Then } from 'react-if';
interface ClassTime {
  day?: number;
  start?: string;
  end?: string;
}
const options = [
  {
    label: i18nContant('Monday'),
    value: 1,
  },
  {
    label: i18nContant('Tuesday'),
    value: 2,
  },
  {
    label:  i18nContant('Wednesday'),
    value: 3,
  },
  {
    label:  i18nContant('Thursday'),
    value: 4,
  },

  {
    label:  i18nContant('Friday'),
    value: 5,
  },
  {
    label:  i18nContant('Saturday'),
    value: 6,
  },
  {
    label: i18nContant('Sunday'),
    value: 0,
  },
];

type ClassRecord = Record<number, any>;

function Schedule({ data, refetch }: any) {
  console.log(data);
  const { t } = useTranslation();
  const [createLesson] = useCreateLessonDefaultMutation();
  const [classArray, setClassArray] = useState<ClassRecord>({
    [uuidv4()]: { day: undefined, time: '' },
  });
  const [title, setTitle] = useState<string>('');
  const [color, setColor] = useState<any>('#fff');
  const [bgColor, setBgColor] = useState<any>(COLOR.Primary);
  const [eventId, setEventId] = useState<any>(null);

  const format = 'HH:mm';
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
      setTitle(`[#CLASS${data?.id}] ${subjectString}`);
      setBgColor(data?.bgColor || COLOR.Primary);
      setColor(data?.textColor || 'white');

      let schedules: ClassRecord = {};
      data?.schedules?.forEach((schedule: any) => {
        const id = uuidv4();
        // @ts-ignore
        schedules[id] = {
          day: schedule?.dayOfWeek,
          time: [dayjs(schedule?.timeStart, format), dayjs(schedule?.timeEnd, format)],
        };
      });

      if (!isEmpty(schedules)) {
        setClassArray({ ...schedules });
      }
    }
  }, [data]);

  const weeklySchedule = useMemo(() => {
    if (isEmpty(data?.lessons || title)) {
      return [];
    }
    return data?.lessons?.map(({ lessonStart, lessonEnd, id }: any) => ({
      id: id,
      start: dayjs(lessonStart).format('YYYY-MM-DD HH:mm'),
      end: dayjs(lessonEnd).format('YYYY-MM-DD HH:mm'),
      title,
      backgroundColor: data?.bgColor || COLOR.Primary,
      borderColor: data?.bgColor || COLOR.Primary,
      textColor: data?.textColor || 'white',
      extendedProps: {
        content: 'content',
        start: dayjs(lessonStart).format('HH:mm'),
        end: dayjs(lessonEnd).format('HH:mm'),
        id,
      },
    }));
  }, [data, title]);

  const handleSave = () => {
    const dataCovert: ClassTime[] = Object.entries(classArray).map(([id, values]: any) => {
      return {
        day: values?.day,
        start: values?.time?.[0]?.format(format),
        end: values?.time?.[1]?.format(format),
      };
    });
    createLesson({
      collaboratorId: data?.id,
      startDate: dayjs(data?.contractStartDate).format('YYYY-MM-DD'),
      endDate: dayjs(data?.contractEndDate).format('YYYY-MM-DD'),
      classTimes: dataCovert,
      title,
      textColor: color,
      bgColor,
    }).then(() => refetch());

    // setClassTimes([...dataCovert]);
  };

  function renderEventContent(eventContent: any) {
    return (
      <Popover
        placement='top'
        title={eventContent.event.title}
        zIndex={99999}
        content={
          <Space>
            {'time'} : {eventContent.event?.extendedProps?.start} -{' '}
            {eventContent.event?.extendedProps?.end}
            <Space
              className={css`
                display: flex;
                justify-content: flex-end;
                margin-top: 1rem;
              `}
            >
              {/*<Button*/}
              {/*  $size={SIZE.Small}*/}
              {/*  onClick={() => setEventId(eventContent?.event?.extendedProps?.id)}*/}
              {/*>*/}
              {/*</Button>*/}
            </Space>
          </Space>
        }
      >
        <Space
          className={css`
            display: block;
            word-break: break-word;
            width: 100%;
            white-space: initial;
            padding: 0 4px;
            background-color: ${eventContent.backgroundColor};
            color: ${eventContent.textColor};
          `}
        >
          {/*<b>{eventContent.timeText}</b>*/}
          {eventContent.event.title}
        </Space>
      </Popover>
    );
  }

  const renderMoreLinkContent = () => {
    return <></>;
  };
  const handleEventClick = (eventContent: any) => {
    console.log(eventContent);
    setEventId(eventContent?.event?.extendedProps?.id);
  };

  return (
    <Space className={css``}>
      <Space
        className={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        <H2>{t('class.create.schedule')}</H2>

        <Button
          onClick={handleSave}
          $size={SIZE.ExtraSmall}
        >
          {t('class.save.schedule')}{' '}
        </Button>
      </Space>
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

          <Space>{t('class.time_date')}</Space>
          <RangePicker
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
          <Space>{t('class.text.color')}</Space>
          <ColorPicker
            onChange={(color) => setColor(color.toHexString())}
            value={color}
            showText={(color) => <span>({color.toHexString()})</span>}
            defaultFormat={'hex'}
          />
        </Space>
        <Space>
          <Space>{t('class.bg.color')}</Space>
          <ColorPicker
            onChange={(color) => setBgColor(color.toHexString())}
            value={bgColor}
            className={css``}
            defaultFormat={'hex'}
            showText={(color) => <span>({color.toHexString()})</span>}
          />
        </Space>
      </Space>

      {Object.entries(classArray)?.map(([id, values]: any, index: number) => {
        // @ts-ignore
        return (
          <Space
            className={css`
              display: flex;
              gap: 1rem;
              margin-bottom: 1rem;
            `}
          >
            <Space>
              <div>{t('class.dayOfWeek')}</div>
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
                placeholder={t('class.select.dayOfWeek')}
                size={'middle'}
                value={values?.day}
              />
            </Space>

            <Space>
              <div>{t('class.time_day')}</div>
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
                dropdownClassName={timePickerCss}
                value={values?.time}
                getPopupContainer={(trigger: HTMLElement) => trigger.parentElement || document.body}
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
                      return { ...prev };
                    });
                  }}
                  $size={SIZE.ExtraSmall}
                >
                  - {t("remove")}
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
          + {t("add")}
        </Button>
      </Space>

      <Space
        className={css`
          flex: 1;
        `}
      >
        <Calendar
          initData={weeklySchedule}
          renderEventContent={renderEventContent}
          handleEventClick={handleEventClick}
          moreLinkContent={renderMoreLinkContent}
        />
      </Space>
      <If condition={!!eventId}>
        <Then>
          <Event
            id={eventId}
            close={() => setEventId(null)}
          />
        </Then>
      </If>
    </Space>
  );
}

export default Schedule;
