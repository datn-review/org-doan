import { css } from '@emotion/css';
import { useTranslation } from '@org/i18n';
import { AvatarUser, Space } from '@org/ui';
import { COLOR, COLOR_RGB, getImage } from '@org/utils';
import { Else, If, Then } from 'react-if';
import botLogo from '../../assets/img/bot.png';
import { useAppSelector } from '@org/store';
import { AvataBot } from '.';
export const MessageItem = ({ message }: any) => {
  const { isAuthenticated, userId } = useAppSelector((state) => state.auth);
  const title = `${message?.owner?.lastName} ${message?.owner?.firstName}`;
  const logo = message?.owner?.photo?.path || '';
  const isAuth = userId === message?.owner?.id;

  const { t } = useTranslation();
  return (
    <Space
      className={css`
        padding: 0.7rem;
        margin-bottom: 0.4rem;
        display: flex;
        align-items: center;
        justify-content: ${message.isMe || isAuth ? 'flex-end' : 'flex-start'};
        gap: 1rem;
      `}
    >
      <If condition={!message.isMe && !isAuth}>
        <Then>
          <Space>
            <AvatarUser
              img={logo}
              id={message?.onwer?.id}
              title={title}
            />
          </Space>
        </Then>
      </If>

      <Space
        className={css`
          padding: 1rem;
          border-radius: 0.4rem;
          cursor: pointer;

          background: ${message.isMe || isAuth ? COLOR.Primary : 'white'} !important;
          color: ${message.isMe || isAuth ? `white` : 'auto'} !important;

          /* margin-bottom: 0.5rem; */
          display: flex;
          align-items: center;
          gap: 1rem;
          font-weight: 600;
        `}
      >
        {message?.content}
      </Space>
      <If condition={message.isMe || isAuth}>
        <Then>
          <Space>
            <AvatarUser
              img={logo}
              id={message?.onwer?.id}
              title={title}
            />
          </Space>
        </Then>
      </If>
    </Space>
  );
};
