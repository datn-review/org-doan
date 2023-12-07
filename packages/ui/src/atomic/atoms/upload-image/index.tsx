import React, { useMemo, useState } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile, UploadListType, UploadFileStatus } from 'antd/es/upload/interface';
import { Show } from '../show';
import { withForm } from '../../../form';
import { useTranslation } from '@org/i18n';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface IUploadImage {
  maxLength?: number;
  name: string;
  onChange?: (value: UploadFile[]) => void;
  value?: UploadFile[];
  labelImage?: string;
  listType?: UploadListType;
  [k: string]: any;
}

export const UploadImage: React.FC<IUploadImage> = ({
  maxLength = 1,
  name,
  onChange,
  value = [],
  listType = 'picture-circle',
  ...props
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  //   const [fileList, setFileList] = useState<UploadFile[]>([]);
  const valueCovert = useMemo(() => {
    const dataMap: UploadFile[] = value?.map((item) => ({
      ...item,
      status: 'done',
    }));
    return dataMap;
  }, [value]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    onChange && onChange(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <>
      <Upload
        action={''}
        customRequest={() => {}}
        listType={listType}
        fileList={valueCovert}
        onPreview={handlePreview}
        onChange={handleChange}
        name={name}
        {...props}
      >
        {value.length >= maxLength ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt='example'
          style={{ width: '100%' }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

export const UploadFiles: React.FC<IUploadImage> = ({
  maxLength = 1,
  name,
  onChange,
  value = [],
  listType = 'picture-circle',
  ...props
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const { t } = useTranslation();
  //   const [fileList, setFileList] = useState<UploadFile[]>([]);
  const valueCovert = useMemo(() => {
    const dataMap: UploadFile[] = value?.map((item) => ({
      ...item,
      status: 'done',
    }));
    return dataMap;
  }, [value]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    onChange && onChange(newFileList);
  };

  const uploadButton = (
    <div>
      <Button icon={<UploadOutlined />}>{t('upload')}</Button>
    </div>
  );
  return (
    <>
      <Upload
        action={''}
        customRequest={() => {}}
        fileList={valueCovert}
        // onPreview={handlePreview}
        onChange={handleChange}
        name={name}
        {...props}
      >
        {value.length >= maxLength ? null : uploadButton}
      </Upload>
    </>
  );
};
export const UnloadImageForm = withForm<IUploadImage>(UploadImage);
export const UploadFilesForm1 = withForm<IUploadImage>(UploadFiles);

// [
//   {
//     uid: '-1',
//     name: 'image.png',
//     status: 'done',
//     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//   },
//   {
//     uid: '-xxx',
//     percent: 50,
//     name: 'image.png',
//     status: 'uploading',
//     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//   },
//   {
//     uid: '-5',
//     name: 'image.png',
//     status: 'error',
//   },
// ];
