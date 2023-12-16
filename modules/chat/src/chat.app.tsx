import { css, cx } from '@emotion/css';
import { useTranslation } from '@org/i18n';
import {
  setActiveGroup,
  useAddMessageMutation,
  useAppDispatch,
  useAppSelector,
  useCreateRoomMutation,
  useGetRoomQuery,
  useGetUsersActiveQuery,
  useLazyGetMessagesQuery,
} from '@org/store';
import {
  Avatar,
  AvatarUser,
  Button,
  Col,
  FormOutlined,
  Input,
  ModalAntd,
  Row,
  SectionLayout,
  Select,
  SIZE,
  Space,
  TextArea,
  UserHeaderProfile,
} from '@org/ui';
import { COLOR, getImage, SiteMap } from '@org/utils';
import { useEffect, useMemo, useState, useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatItem } from './atomic/atoms/chat-item';
import { AvataBot } from './atomic/atoms';
import { MessageItem } from './atomic/atoms/message-item';
import { isEmpty } from 'lodash';
function ChatApp() {
  const { isAuthenticated, userId } = useAppSelector((state) => state.auth);
  const user = useAppSelector((state) => state.user);

  const { t } = useTranslation();
  const [chat, setChat] = useState<string>('');
  const [toggle, setToggle] = useState<boolean>(false);
  const [roomActive, setRoomActive] = useState<number | null>(0);

  const [room, setRoom] = useState<any>();
  const [roomData, setRoomData] = useState<any>({ title: t('bot') });

  const [roomList, setRoomList] = useState<any>([]);
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
  const { data: rooms, refetch } = useGetRoomQuery({});

  const [createRoom] = useCreateRoomMutation();

  const userData = useMemo(() => {
    return users
      ?.map((user: any) => ({
        label: `${user?.lastName} ${user?.lastName}`,
        value: user.id,
      }))
      .filter((user: any) => user?.value !== userId);
  }, [users]);
  const refMessage = useRef<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    if (refMessage?.current) {
      refMessage?.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  }, [messages]);

  const close = () => setToggle(false);
  return (
    <Space
      className={cx(
        css`
          height: calc(100vh - 12rem);
          margin-bottom: 3rem;
        `,
        'chat',
      )}
    >
      <SectionLayout>
        <Row
          gutter={0}
          className={css`
            height: calc(100vh - 14rem);
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
                  onChange={(value) => {
                    const data = rooms?.find(
                      (room: any) => room.isSingle && value === room?.friends?.[0]?.id,
                    );
                    if (!isEmpty(data)) {
                      const friend = data?.friends?.[0];
                      const title = `${friend?.lastName} ${friend?.firstName}`;

                      const logo = friend?.photo?.path;

                      const dataNew = {
                        friend,
                        title,
                        logo,
                        id: friend?.id,
                      };
                      getMessages(data?.id);
                      setRoomActive(data?.id);
                      setRoomData(dataNew);
                    } else {
                      createRoom({ title: '', members: [value] })
                        .unwrap()
                        .then((room: any) => {
                          refetch()
                            .unwrap()
                            .then((response: any) => {
                              const roomData = response?.find((item: any) => item.id == room?.id);

                              const friend = roomData?.friends?.[0];
                              const title = roomData?.isSingle
                                ? `${friend?.lastName} ${friend?.firstName}`
                                : roomData?.title;

                              const logo = roomData?.isSingle ? friend?.photo?.path : '';
                              getMessages(roomData?.id);
                              setRoomActive(roomData?.id);

                              const dataNew = {
                                friend,
                                title,
                                logo,
                                id: friend?.id,
                              };

                              setRoomData(dataNew);
                            });
                        });
                    }
                  }}
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

              <ChatItem
                room={null}
                isActive={0 === roomActive}
                onClick={() => {
                  getMessages(0);
                  setRoomActive(0);
                  setRoomData({
                    title: t('bot'),
                  });
                }}
                isBot
              />

              <h4
                className={css`
                  color: ${COLOR.Primary};
                  padding: 1rem 1.2rem;
                `}
              >
                {t('chats')}
              </h4>
              <Space
                className={css`
                  height: calc(100vh - 26rem);
                  overflow-y: auto;
                `}
              >
                {rooms?.map((room: any) => (
                  <ChatItem
                    room={room}
                    isActive={room.id === roomActive}
                    onClick={(data: any) => {
                      getMessages(room.id);
                      setRoomActive(room.id);
                      setRoomData(data);
                    }}
                  />
                ))}
              </Space>
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
                  display: flex;
                  background-color: white;
                `}
              >
                <Space
                  className={css`
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    gap: 1rem;
                  `}
                >
                  {roomActive === 0 ? (
                    <AvataBot />
                  ) : (
                    <AvatarUser
                      title={roomData?.title}
                      img={roomData?.logo}
                      id={roomData?.id}
                    />
                  )}

                  <Space>
                    <b
                      className={css`
                        font-size: 15px;
                      `}
                    >
                      {roomData?.title}
                    </b>
                    {(roomData?.isSingle || roomActive === 0) && (
                      <div>{roomData?.friend?.role?.name || t('bot.message')}</div>
                    )}
                  </Space>
                </Space>

                {/* <UserHeaderProfile user={{}} /> */}
              </Space>
              <Space
                className={css`
                  height: calc(100vh - 26rem);

                  padding: 20px;
                  overflow-y: auto;
                `}
              >
                {messages?.map((message: any) => (
                  <MessageItem message={message} />
                ))}
                <div ref={refMessage} />
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
                  value={chat}
                />
                <Button
                  onClick={() => {
                    addMessage({ room: roomActive, owner: userId, content: chat });
                    setChat('');
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
              createRoom({ ...room })
                .unwrap()
                .then((room: any) => {
                  refetch()
                    .unwrap()
                    .then((response: any) => {
                      const roomData = response?.find((item: any) => item.id == room?.id);

                      const friend = roomData?.friends?.[0];
                      const title = roomData?.isSingle
                        ? `${friend?.lastName} ${friend?.firstName}`
                        : roomData?.title;

                      const logo = roomData?.isSingle ? friend?.photo?.path : '';
                      getMessages(roomData?.id);
                      setRoomActive(roomData?.id);

                      const dataNew = {
                        friend,
                        title,
                        logo,
                        id: friend?.id,
                      };

                      setRoomData(dataNew);
                      close();
                    });
                });
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
