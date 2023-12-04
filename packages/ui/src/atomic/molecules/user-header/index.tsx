// @flow
import * as React from 'react';
import { Space } from '../../atoms';
import { css } from '@emotion/css';
import { COLOR, getImage, SiteMap } from '@org/utils';
import { Link } from 'react-router-dom';
type Props = { user: any };
export const UserHeaderProfile = ({ user }: Props) => {
  return (
    <Space
      className={css`
        display: flex;
        align-items: center;
        gap: 1rem;
      `}
    >
      <Link to={SiteMap.Profile.generate(user?.id)}>
        <Space
          className={css`
            //height: 5rem;
            //width: 5rem;
            object-fit: cover;
          `}
        >
          <img
            className={css`
              object-fit: cover;
              height: 4rem;
              width: 4rem;
              border-radius: 50%;
              border: 1px solid ${COLOR.Primary};
              padding: 0.1rem;
            `}
            src={getImage(user?.photo?.path)}
            alt={user?.photo?.path}
          />
        </Space>
      </Link>

      <Space>
        <Space
          className={css`
            font-weight: 600;
            font-size: 16px;
          `}
        >
          {user?.lastName} {user?.firstName}
        </Space>
        {/*<Space>{user?.photo?.path}</Space>*/}
      </Space>
    </Space>
  );
};
