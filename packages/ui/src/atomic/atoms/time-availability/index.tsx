import React, { useRef, useState } from 'react';
import { Cascader, CascaderProps } from 'antd';
import { Space } from '../space';
import { css, cx } from '@emotion/css';
import { withForm } from '../../../form/connectForm';
import { COLOR, COLOR_RGB } from '@org/utils';
interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}

export const timeAvailabilityImport = (data: any) => {
  return data?.map((item: any) => `${item?.dayofWeekId}__${item?.hourId}`) || [];
};

const timeInDay: Option[] = Array.from({ length: 24 }, (value, index) => ({
  value: index,
  label: `${index}`,
}));
const timeAvailabilitys: Option[] = [
  {
    value: 2,
    label: 'Moday',
    children: timeInDay,
  },
  {
    value: 3,
    label: 'Tuesday',
    children: timeInDay,
  },
  {
    value: 4,
    label: 'Wednesday',
    children: timeInDay,
  },
  {
    value: 5,
    label: 'Thursday',
    children: timeInDay,
  },
  {
    value: 6,
    label: 'Friday',
    children: timeInDay,
  },
  {
    value: 7,
    label: 'Saturday',
    children: timeInDay,
  },
  {
    value: 8,
    label: 'Sunday',
    children: timeInDay,
  },
];
interface ITimeAvailability {
  label?: string;
  name?: string;
  onChange?: (value: any) => void;
  [k: string]: any;
}
export function TimeAvailability({ label, onChange, value, ...rest }: any) {
  // const [timeAvailabilityCheck, setTimeAvailabilityCheck] = useState<string[]>([]);

  const timeAvailabilityCheck = value;

  const handleCheck = (value: string) => {
    if (timeAvailabilityCheck?.includes(value)) {
      onChange(timeAvailabilityCheck.filter((item: string) => value !== item));
    } else {
      onChange([...timeAvailabilityCheck, value]);
    }
  };
  return (
    <Space>
      {label && (
        <label
          className={css`
            display: block;
            padding-bottom: 0.3rem;
            font-size: 1.3rem;
          `}
        >
          {label}
        </label>
      )}
      <Space
        className={cx(
          css`
            overflow: auto;
            overflow-y: hidden;
            border: 1px #fff s;
          `,
          'scroll-customer',
        )}
      >
        <Space
          className={css`
            width: 820px;
            overflow: auto;
            overflow-y: hidden;
          `}
        >
          {timeAvailabilitys.map((day: Option) => {
            return (
              <Space
                className={css`
                  display: flex;
                  /* width: 100%; */
                  /* flex-wrap: wrap; */
                `}
              >
                <Space
                  className={css`
                    width: 11rem;
                    border: solid 1px #ccc;
                    padding-left: 1rem;
                    border-radius: 5px;
                    line-height: 30px;
                  `}
                >
                  {day.label}
                </Space>
                <Space
                  className={css`
                    display: flex;
                    width: 100%;
                    flex-wrap: wrap;
                  `}
                >
                  {day?.children?.map((dayhours) => {
                    const value = `${day?.value}__${dayhours?.value}` as string;
                    const isChecked = timeAvailabilityCheck?.includes(value);
                    const bg = isChecked ? `rgba(${COLOR_RGB.Primary},1) !important` : 'efefef';
                    const color = isChecked ? `${COLOR.White} !important` : '#ccc';

                    return (
                      <Space
                        className={css`
                          text-align: center;
                          cursor: pointer;
                          user-select: none;
                          background-color: ${bg};
                          width: 30px;
                          height: 30px;
                          line-height: 30px;
                          font-weight: 600;
                          text-align: center;
                          color: ${color};
                          border: solid 1px #ccc;
                          background: ${bg};
                          user-select: none;
                          touch-action: none;
                          border-radius: 5px;
                          &:hover {
                            background: ${COLOR.Secondary};
                            color: white;
                          }
                        `}
                        onMouseDown={() => handleCheck(value)}
                        // onMouseOver={() => handleCheck(value)}
                        onMouseOver={(e) => {
                          if (e.buttons == 1) {
                            handleCheck(value);
                          }
                        }}
                      >
                        {dayhours.label}
                      </Space>
                    );
                  })}
                </Space>
              </Space>
            );
          })}
        </Space>
      </Space>
    </Space>
  );
}

export const TimeAvailabilityForm = withForm<ITimeAvailability & { name: string }>(
  TimeAvailability,
);
