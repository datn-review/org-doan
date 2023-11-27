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
} from '@org/ui';
import { SiteMap } from '@org/utils';
import { useEffect, useMemo, useState } from 'react';
import { If, Then } from 'react-if';
import { useNavigate, useParams } from 'react-router-dom';
import { css } from '@emotion/css';

function ChatApp() {
  const { isAuthenticated, userId } = useAppSelector((state) => state.auth);
  console.log(userId);
  const { t } = useTranslation();
  const [chat, setChat] = useState<string>('');
  const [toggle, setToggle] = useState<boolean>(false);
  const [roomActive, setRoomActive] = useState<boolean>(false);

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

  console.log(messages);
  const close = () => setToggle(false);
  return (
    <Space className={'chat'}>
      <SectionLayout>
        <Row gutter={[20, 20]}>
          <Col span={8}>
            <Space
              className={css`
                display: flex;
                justify-content: space-between;
                align-items: center;
              `}
            >
              <Input
                // onChange={(value: string) => setChat(String(value))}
                name={'search'}
              />
              <FormOutlined onClick={() => setToggle(true)} />
            </Space>
            {rooms?.map((room: any) => (
              <Space
                onClick={() => {
                  getMessages(room.id);
                  setRoomActive(room.id);
                }}
              >
                {room?.title}
              </Space>
            ))}
          </Col>
          <Col span={8}>
            {messages?.map((message: any) => (
              <Space>
                {message?.owner?.lastName} {message?.owner?.firstName} : {message?.content}
              </Space>
            ))}
            <Space
              className={css`
                display: flex;
              `}
            >
              <Input
                onChange={(value) => setChat(String(value))}
                name={'chat'}
              />
              <Button
                $size={SIZE.ExtraSmall}
                onClick={() => {
                  addMessage({ room: roomActive, owner: userId, content: chat });
                }}
              >
                {t('message.send')}
              </Button>
            </Space>
          </Col>
        </Row>
        <ModalAntd
          title={t('chat.create')}
          open={toggle}
          onCancel={close}
          width={'90%'}
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
