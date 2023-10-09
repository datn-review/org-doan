import { useTranslation } from '@org/i18n';
import { BoxCenter, Button, Drawer, SIZE, Space, TYPE_BUTTON, VARIANT } from '@org/ui';
import React from 'react';

export function UpsertUser({ onClose, onSave, open, idEdit }: any) {
  const { t } = useTranslation();
  return (
    <Drawer
      title={idEdit ? t('user.edit.title') : t('user.add.title')}
      placement={'right'}
      width={500}
      onClose={onClose}
      open={open}
      extra={
        <BoxCenter>
          <Button
            onClick={onClose}
            $type={TYPE_BUTTON.Primary}
            $variant={VARIANT.Outlined}
            $size={SIZE.ExtraSmall}
          >
            {t('button.cancel')}
          </Button>
          <Button
            $type={TYPE_BUTTON.Primary}
            $size={SIZE.ExtraSmall}
            onClick={onSave}
          >
            {t('button.save')}
          </Button>
        </BoxCenter>
      }
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
}
