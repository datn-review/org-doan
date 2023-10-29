import { useTranslation } from '@org/i18n';
import { setActiveGroup, useAppDispatch, useAppSelector } from '@org/store';
import { Space } from '@org/ui';
import { SiteMap } from '@org/utils';
import { useEffect } from 'react';
import { If, Then } from 'react-if';
import { useNavigate, useParams } from 'react-router-dom';

function LookForTutorApp() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActiveGroup({ current: SiteMap.LookForTutor.menu }));
    return () => {
      dispatch(setActiveGroup({ current: '' }));
    };
  }, []);
  return (
    <>
      <Space className={'look-for-tutor'}>
        <If condition={isAuthenticated}>
          <Then>look-for-tutor</Then>
        </If>
      </Space>
    </>
  );
}

export default LookForTutorApp;
