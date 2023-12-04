import { useTranslation } from '@org/i18n';
import { setActiveGroup, useAppDispatch, useAppSelector } from '@org/store';
import { Space } from '@org/ui';
import { SiteMap } from '@org/utils';
import { useEffect } from 'react';
import { If, Then } from 'react-if';
import { useNavigate, useParams } from 'react-router-dom';

function AssessmentApp() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActiveGroup({ current: SiteMap.Assessment.menu }));
    return () => {
      dispatch(setActiveGroup({ current: '' }));
    };
  }, []);
  return (
    <>
      <Space className={'assessment'}>
        <If condition={isAuthenticated}>
          <Then>assessment</Then>
        </If>
      </Space>
    </>
  );
}

export default AssessmentApp;
