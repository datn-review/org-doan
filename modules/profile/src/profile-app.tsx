import { useTranslation } from '@org/i18n';
import { setActiveGroup, useAppDispatch, useAppSelector, useGetProfileMeQuery } from '@org/store';
import { SectionLayout, Space } from '@org/ui';
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
  const { data } = useGetProfileMeQuery({});
  console.log('🚀 ~ file: profile-app.tsx:23 ~ ProfileApp ~ data:', data);
  return (
    <>
      <SectionLayout className={'profile'}>
        <If condition={isAuthenticated}>
          <Then>
            <InfoHeader data={data} />
            <Section data={data} />
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
      </SectionLayout>
    </>
  );
}

export default ProfileApp;
