// @flow
import * as React from 'react';
import { Tag } from '@org/ui';
import { colorById } from '@org/utils';
import { getNameLanguage } from '@org/i18n';

type Props = {};
export const TagsList = ({
  data,
  isReverse = false,
  bordered = false,
}: {
  data: any;
  isReverse?: boolean;
  bordered?: boolean;
}) => {
  return (
    <>
      {data?.map(({ nameEN, nameVI, id }: any) => (
        <Tag
          bordered={bordered}
          color={colorById(id, isReverse)}
        >
          {getNameLanguage(nameVI, nameEN)}
        </Tag>
      ))}
    </>
  );
};
