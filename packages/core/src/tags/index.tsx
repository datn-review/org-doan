// @flow
import * as React from 'react';
import { Tag } from '@org/ui';
import { colorById } from '@org/utils';
import { getNameLanguage } from '@org/i18n';

type Props = {};
export const TagsList = ({ data, isReverse = false }: { data: any; isReverse?: boolean }) => {
  return (
    <>
      {data?.map(({ nameEN, nameVI, id }: any) => (
        <Tag
          bordered={false}
          color={colorById(id, isReverse)}
        >
          {getNameLanguage(nameVI, nameEN)}
        </Tag>
      ))}
    </>
  );
};
