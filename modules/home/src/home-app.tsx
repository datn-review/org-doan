import { Authorization } from '@org/auth';
import { useTranslation } from '@org/i18n';
import { setActiveGroup, useAppDispatch, useAppSelector } from '@org/store';
import { Space, Table } from '@org/ui';
import { RolesEnum, TypeRolesEnum } from '@org/utils';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StepRegister from './atomic/molecules/step-register';
import TutorClass from './atomic/molecules/tutor-class-incognito';
import Banner from './atomic/molecules/banner/Banner';
function HomeApp() {
  useTranslation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActiveGroup({ current: 'home' }));
    return () => {
      dispatch(setActiveGroup({ current: '' }));
    };
  }, []);
  return (
    <>
      <Space>
        <Banner />
        <StepRegister />
        <TutorClass />
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

export default HomeApp;
