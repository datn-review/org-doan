import { useTranslation } from '@org/i18n';
import {
  setActiveGroup,
  useAddMessageMutation,
  useAppDispatch,
  useAppSelector,
  useCreateRoomMutation,
  useGetMessagesQuery,
  useGetRoomQuery,
  useGetUsersActiveQuery,
  useGetUserStudentQuery,
  useLazyGetMessagesQuery,
} from '@org/store';
import {
  Input,
  SectionLayout,
  Space,
  Row,
  Col,
  FormOutlined,
  Select,
  ModalAntd,
  SIZE,
  Button,
  UserHeaderProfile,
} from '@org/ui';
import { COLOR, getImage, SiteMap } from '@org/utils';
import { useEffect, useMemo, useState } from 'react';
import { If, Then } from 'react-if';
import { useNavigate, useParams } from 'react-router-dom';
import { css, cx } from '@emotion/css';

function ChatApp() {
  const { isAuthenticated, userId } = useAppSelector((state) => state.auth);
  const user = useAppSelector((state) => state.user);

  const { t } = useTranslation();
  const [chat, setChat] = useState<string>('');
  const [toggle, setToggle] = useState<boolean>(false);
  const [roomActive, setRoomActive] = useState<number>(null);

  const [room, setRoom] = useState<any>({
    title: '',
    members: [],
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActiveGroup({ current: SiteMap.Chat.menu }));
    return () => {
      dispatch(setActiveGroup({ current: '' }));
    };
  }, []);

  const [getMessages, { data: messages }] = useLazyGetMessagesQuery();

  const [addMessage] = useAddMessageMutation();

  const { data: users } = useGetUsersActiveQuery({});
  const { data: rooms } = useGetRoomQuery({});

  const [createRoom] = useCreateRoomMutation();

  const userData = useMemo(() => {
    return users?.map((user: any) => ({
      label: `${user?.lastName} ${user?.lastName}`,
      value: user.id,
    }));
  }, [users]);

  const close = () => setToggle(false);
  return (
    <Space
      className={cx(
        css`
          height: 55rem;
          margin-bottom: 3rem;
        `,
        'chat',
      )}
    >
      <SectionLayout>
        <Row
          gutter={0}
          className={css`
            height: 55rem;
            border-radius: 0.5rem;
            overflow: hidden;
            box-shadow: 0 0 6px rgba(47, 43, 61, 0.14), 0 0 transparent, 0 0 transparent;
          `}
        >
          <Col
            span={8}
            className={css`
              background-color: white;

              /* box-shadow: 0 0 6px rgba(47, 43, 61, 0.14), 0 0 transparent, 0 0 transparent; */
              height: 100%;
              border-right: 1px solid #9ca3af80;
            `}
          >
            <Space
              className={css`
                padding: 1rem;
                display: flex;
                //justify-content: space-between;
                gap: 1rem;
                align-items: center;
                border-bottom: 1px solid #9ca3af80;
              `}
            >
              <Space>
                <img
                  src={getImage(user?.photo?.path)}
                  alt={''}
                  className={css`
                    border-radius: 50%;
                    height: 4rem;
                    width: 4rem;
                    object-fit: cover;
                  `}
                />
              </Space>
              <Space
                className={css`
                  flex: 1;
                `}
              >
                <Select
                  options={userData || []}
                  showSearch
                  className={css`
                    width: 100%;
                    .ant-select-selector {
                      border-radius: 20rem;
                    }
                  `}

                  // onChange={(value) => setRoom((prev: any) => ({ ...prev, members: value }))}
                />
              </Space>
              <FormOutlined onClick={() => setToggle(true)} />
            </Space>
            <Space
              className={css`
                padding: 1rem 1.2rem;
              `}
            >
              <h4
                className={css`
                  color: ${COLOR.Primary};
                  padding: 1rem 1.2rem;
                `}
              >
                {t('bot')}
              </h4>
              <Space
                className={css`
                  padding: 1.2rem;
                  border-radius: 0.4rem;
                  cursor: pointer;
                  &:hover {
                    background: ${COLOR.Primary};
                    color: ${COLOR.White};
                  }
                  background: ${roomActive == 0 ? COLOR.Primary : 'auto'};
                  color: ${0 === roomActive ? COLOR.White : 'auto'};
                  margin-bottom: 0.5rem;
                `}
                onClick={() => {
                  getMessages(0);
                  setRoomActive(0);
                }}
              >
                {t('bot')}
              </Space>
              <h4
                className={css`
                  color: ${COLOR.Primary};
                  padding: 1rem 1.2rem;
                `}
              >
                {t('chats')}
              </h4>
              {rooms?.map((room: any) => (
                <Space
                  className={css`
                    padding: 1.2rem;
                    border-radius: 0.4rem;
                    cursor: pointer;
                    &:hover {
                      background: ${COLOR.Primary};
                      color: ${COLOR.White};
                    }
                    background: ${room.id === roomActive ? COLOR.Primary : 'auto'};
                    color: ${room.id === roomActive ? COLOR.White : 'auto'};
                    margin-bottom: 0.5rem;
                  `}
                  onClick={() => {
                    getMessages(room.id);
                    setRoomActive(room.id);
                  }}
                >
                  {room?.title}
                </Space>
              ))}
            </Space>
          </Col>
          <Col span={16}>
            <Space
              className={css`
                position: relative;
                height: 100%;
              `}
            >
              <Space
                className={css`
                  padding: 1rem;
                  display: flex;
                  justify-content: space-between;
                  /* gap: 1rem; */
                  align-items: center;
                  border-bottom: 1px solid #9ca3af80;
                  display: block;
                  background-color: white;
                `}
              >
                <UserHeaderProfile user={{}} />
              </Space>
              <Space
                className={css`
                  height: 40.5rem;
                  padding: 20px;
                `}
              >
                {messages?.map((message: any) => (
                  <Space>
                    {message?.owner?.lastName} {message?.owner?.firstName} : {message?.content}
                  </Space>
                ))}
              </Space>
              <Space
                className={css`
                  display: flex;
                  gap: 1rem;
                  position: absolute;
                  width: 100%;
                  left: 0;
                  right: 0;
                  bottom: 10px;
                  padding: 0 20px;
                `}
              >
                <Input
                  onChange={(value) => setChat(String(value))}
                  name={'chat'}
                  placeholder={t('type.your.message')}
                />
                <Button
                  onClick={() => {
                    addMessage({ room: roomActive, owner: userId, content: chat });
                  }}
                >
                  {t('message.send')}
                </Button>
              </Space>
            </Space>
          </Col>
        </Row>
        <ModalAntd
          title={t('chat.create')}
          open={toggle}
          onCancel={close}
          width={'50%'}
          className={css`
            top: 20px;
          `}
          footer={<></>}
        >
          <Input
            labelInput={t('chat.room.name')}
            name={'nameRoom'}
            onChange={(value) => setRoom((prev: any) => ({ ...prev, title: String(value) }))}
          />
          <Select
            label={t('chat.user')}
            mode='tags'
            options={userData || []}
            showSearch
            onChange={(value) => setRoom((prev: any) => ({ ...prev, members: value }))}
          />
          <br />
          <Button
            $size={SIZE.ExtraSmall}
            onClick={() => {
              createRoom({ ...room });
            }}
          >
            {t('create')}
          </Button>
        </ModalAntd>
      </SectionLayout>
    </Space>
  );
}

export default ChatApp;
