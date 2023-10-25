import { Authorization } from '@org/auth';
import { useTranslation } from '@org/i18n';
import { setActiveGroup, useAppDispatch, useAppSelector } from '@org/store';
import { Button, Col, Row, Space, Table } from '@org/ui';
import { RolesEnum, SiteMap, TypeRolesEnum } from '@org/utils';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { If, Then } from 'react-if';
import { useParams } from 'react-router-dom';
import InfoHeader from './atomic/molecules/info-header';
function ProfileApp() {
  useTranslation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const { id } = useParams();
  console.log('🚀 ~ file: profile-app.tsx:15 ~ ProfileApp ~ id:', id);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActiveGroup({ current: SiteMap.Profile.menu }));
    return () => {
      dispatch(setActiveGroup({ current: '' }));
    };
  }, []);
  return (
    <>
      <Space className={'profile'}>
        <If condition={isAuthenticated}>
          <Then>
            <InfoHeader />
          </Then>
        </If>
        {/* <Authorization
          type={TypeRolesEnum.IF_ANY_GRANTED}
          roles={[RolesEnum.WEB_ADMIN]}
        >
          WEB_ADMIN
        </Authorization>
        <Authorization
          type={TypeRolesEnum.IF_ANY_GRANTED}
          roles={[RolesEnum.WEB_STAFF]}
        >
          WEB_STAFF
        </Authorization> */}
      </Space>
    </>
  );
}

export default ProfileApp;
