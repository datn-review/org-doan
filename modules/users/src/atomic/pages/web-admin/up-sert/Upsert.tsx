import { useCRUDContext } from '@org/core';
import { useTranslation } from '@org/i18n';
import {
  useCreateUserAdminMutation,
  useLazyFindUserAdminQuery,
  useUpdateUserAdminMutation,
} from '@org/store';
import { Space } from '@org/ui';
import { useEffect } from 'react';
import { UpsertUser } from '../../../organisms/up-sert-user';

function Upsert() {
  const { t } = useTranslation();

  const { idEdit, isUpsert, setIsFetch, close, setDataUpsert } = useCRUDContext();

  const [createUser, { isLoading: isLoadingCreate }] = useCreateUserAdminMutation();

  const [getUser, { isLoading: isLoadingGet }] = useLazyFindUserAdminQuery();
  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserAdminMutation();

  useEffect(() => {
    if (idEdit) {
      getUser({ id: idEdit })
        .unwrap()
        .then((data) => {
          console.log(data);
          setDataUpsert(data);
        });
    }
  }, [idEdit]);
  const handleSave = (values: any) => {
    const formData = new FormData();
    Object.entries(values).forEach(([name, value]: [string, string | any]) => {
      if (name === 'photo') {
        formData.append(name, value?.[0].originFileObj);
      } else {
        formData.append(name, value);
      }
    });
    createUser(formData).then((res) => {
      close();
      setIsFetch(true);
    });
  };

  return (
    <Space>
      {isUpsert && (
        <UpsertUser
          onClose={close}
          onSave={handleSave}
          idEdit={idEdit}
          open={isUpsert}
          idLoading={isLoadingCreate || isLoadingGet || isLoadingUpdate}
        />
      )}
    </Space>
  );
}

export default Upsert;
