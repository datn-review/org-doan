// @flow
import * as React from 'react';
import { BoxCenter, Space } from '../../atoms';
import { css } from '@emotion/css';
import { COLOR, colorById, colorByIdUser, getImage, SiteMap } from '@org/utils';
import { Link } from 'react-router-dom';
import { Else, If, Then } from 'react-if';
import { useState, useEffect } from 'react';
type Props = { user: any };
export const UserHeaderProfile = ({ user }: Props) => {
  const [image, setImage] = useState(user?.photo?.path);

  useEffect(() => {
    setImage(user?.photo?.path);
  }, [user?.photo?.path]);
  const handleError = () => {
    setImage('');
  };
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
          <If condition={!!image}>
            <Then>
              <img
                className={css`
                  object-fit: cover;
                  height: 4rem;
                  width: 4rem;
                  border-radius: 50%;
                  border: 2px solid ${COLOR.Primary};
                  padding: 0.1rem;
                `}
                onError={handleError}
                src={getImage(image)}
                alt={image}
              />
            </Then>
            <Else>
              <BoxCenter
                className={css`
                  object-fit: cover;
                  height: 4rem;
                  width: 4rem;
                  border-radius: 50%;
                  border: 2px solid ${COLOR.Primary};
                  padding: 0.1rem;
                  background: ${colorByIdUser(user?.id || 1)};
                  color: white;
                `}
              >
                {user?.lastName?.substring(0, 1) || ''}
              </BoxCenter>
            </Else>
          </If>
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
export const AvatarUser = ({ title, img, id }: any) => {
  const [image, setImage] = useState(img);
  const handleError = () => {
    setImage('');
  };
  useEffect(() => {
    setImage(img);
  }, [img]);
  return (
    <Space
      className={css`
        display: flex;
        align-items: center;
        gap: 1rem;
        cursor: pointer;
      `}
    >
      {/* <Link to={SiteMap.Profile.generate(id)}> */}
      <Space
        className={css`
          //height: 5rem;
          //width: 5rem;
          object-fit: cover;
        `}
      >
        <If condition={!!image}>
          <Then>
            <img
              className={css`
                object-fit: cover;
                height: 4rem;
                width: 4rem;
                border-radius: 50%;
                border: 2px solid ${COLOR.White};
                /* padding: 0.1rem; */
              `}
              src={getImage(image)}
              onError={handleError}
              alt={image}
            />
          </Then>
          <Else>
            <BoxCenter
              className={css`
                object-fit: cover;
                height: 4rem;
                width: 4rem;
                border-radius: 50%;
                border: 2px solid ${COLOR.White};
                /* padding: 0.1rem; */
                background: ${colorByIdUser(id || 1)};
                color: white;
              `}
            >
              {title?.substring(0, 1) || ''}
            </BoxCenter>
          </Else>
        </If>
      </Space>
      {/* </Link> */}
    </Space>
  );
};
