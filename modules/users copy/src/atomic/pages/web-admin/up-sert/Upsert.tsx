import { useCRUDContext, useMessage } from '@org/core';
import {
  useCreateUserAdminMutation,
  useLazyFindUserAdminQuery,
  useUpdateUserAdminMutation,
} from '@org/store';
import { Space } from '@org/ui';
import { useEffect } from 'react';
import { UpsertUser } from '../../../organisms/up-sert-user';
import { useTranslation } from '@org/i18n';

function Upsert() {
  const { t } = useTranslation();
  const { idEdit, isUpsert, setIsFetch, close, setDataUpsert } = useCRUDContext();
  const { messageError, messageSuccess, contextHolder } = useMessage();

  const [createUser, { isLoading: isLoadingCreate }] = useCreateUserAdminMutation();

  const [getUser, { isLoading: isLoadingGet }] = useLazyFindUserAdminQuery();
  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserAdminMutation();

  useEffect(() => {
    if (idEdit) {
      getUser({ id: idEdit })
        .unwrap()
        .then((data) => {
          setDataUpsert(data);
        });
    }
  }, [idEdit]);
  const handleSave = async (formData: any) => {
    if (idEdit) {
      updateUser({ body: formData, id: idEdit })
        .then((res) => {
          messageSuccess(t('user.edit.success'));
        })
        .catch((err) => {
          messageError(t('user.edit.error'));
        })
        .finally(() => {
          close();
          setIsFetch(true);
        });
    } else {
      createUser(formData)
        .then((res) => {
          messageSuccess(t('user.add.success'));
        })
        .catch((err) => {
          messageSuccess(t('user.add.error'));
        })
        .finally(() => {
          close();
          setIsFetch(true);
        });
    }
  };

  return (
    <Space>
      {contextHolder}
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
