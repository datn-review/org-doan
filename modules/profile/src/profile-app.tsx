import { useTranslation } from '@org/i18n';
import {
  setActiveGroup,
  useAppDispatch,
  useAppSelector,
  useGetProfileForIDQuery,
  useGetProfileMeQuery,
} from '@org/store';
import { SectionLayout, Space, Spin } from '@org/ui';
import { SiteMap } from '@org/utils';
import { useEffect } from 'react';
import { If, Then } from 'react-if';
import { useNavigate, useParams } from 'react-router-dom';
import InfoHeader from './atomic/molecules/info-header';
import Section from './atomic/molecules/section';
function ProfileApp() {
  useTranslation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActiveGroup({ current: SiteMap.Profile.menu }));
    return () => {
      dispatch(setActiveGroup({ current: '' }));
    };
  }, []);
  const {
    data: profileMe,
    refetch,
    isLoading: isLoadingMe,
  } = useGetProfileMeQuery({}, { refetchOnMountOrArgChange: true, skip: !!id });
  const { data: profileData, isLoading } = useGetProfileForIDQuery(
    { id: id },
    { refetchOnMountOrArgChange: true, skip: !id },
  );
  const data = !id ? profileMe : profileData;

  return (
    <>
      <SectionLayout className={'profile'}>
        <Spin spinning={isLoadingMe || isLoading}>
          <If condition={isAuthenticated}>
            <Then>
              <InfoHeader data={data} />
              <Section
                data={data}
                isMe={!id}
                refetch={refetch}
              />
            </Then>
          </If>
        </Spin>
      </SectionLayout>
    </>
  );
}

export default ProfileApp;
