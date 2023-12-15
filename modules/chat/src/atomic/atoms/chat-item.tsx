import { css } from '@emotion/css';
import { useTranslation } from '@org/i18n';
import { AvatarUser, Space } from '@org/ui';
import { COLOR, COLOR_RGB, getImage } from '@org/utils';
import { Else, If, Then } from 'react-if';
import botLogo from '../../assets/img/bot.png';
import { useAppSelector } from '@org/store';
import { AvataBot } from '.';
export const ChatItem = ({ room, isActive, onClick, isBot }: any) => {
  const friend = room?.friends?.[0];
  const title = room?.isSingle ? `${friend?.lastName} ${friend?.firstName}` : room?.title;
  const logo = room?.isSingle ? friend?.photo?.path : '';
  const id = room?.isSingle ? friend?.id : room?.id;

  const data = {
    isSingle: room?.isSingle,
    friend,
    title,
    logo,
    id,
  };

  const { t } = useTranslation();
  return (
    <Space
      className={css`
        padding: 0.7rem;
        border-radius: 0.4rem;
        cursor: pointer;
        &:hover {
          background: #eaeaea;
        }
        background: ${isActive
          ? `linear-gradient(72.47deg,rgb(${COLOR_RGB.Primary}) 0%,#fff 300%)`
          : 'auto'} !important;

        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
      `}
      onClick={() => onClick(data)}
    >
      <Space>
        <If condition={isBot}>
          <Then>
            <AvataBot />
          </Then>
          <Else>
            <AvatarUser
              img={logo}
              id={id}
              title={title}
            />
          </Else>
        </If>
      </Space>
      <Space
        className={css`
          color: ${isActive ? COLOR.White : 'auto'} !important;
        `}
      >
        <If condition={isBot}>
          <Then>{t('bot')}</Then>
          <Else>{title}</Else>
        </If>
      </Space>
    </Space>
  );
};
