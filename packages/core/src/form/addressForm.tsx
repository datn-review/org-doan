import {
  useGetProvinceActiveQuery,
  useLazyGetDistrictActiveQuery,
  useLazyGetDistrictQuery,
  useLazyGetWardActiveQuery,
} from '@org/store';
import { Col, InputForm, Row, SelectForm } from '@org/ui';
import { formatData } from '@org/utils';
import React, { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from '@org/i18n';
export const statusOptionUpsert = [{ value: 1, label: 1 }];

export interface IWards {
  id: number;
  name: string;
  districts: IDistricts;
}
export interface IDistricts {
  id: number;
  name: string;
  province: IProvince;
}
export interface IProvince {
  id: number;
  name: string;
}

export function AddressForm({ methods }: any) {
  const { t } = useTranslation();

  const { data: provinceData } = useGetProvinceActiveQuery({});
  const [getDistricts, { data: dataDistrict }] = useLazyGetDistrictActiveQuery();
  const [getWards, { data: dataWard }] = useLazyGetWardActiveQuery();

  const isChangeDistrict = useRef<Boolean>(false);
  const isChangeProvince = useRef<Boolean>(false);

  const districtId = methods?.watch('district');
  const provinceId = methods?.watch('province');

  useEffect(() => {
    isChangeProvince.current && methods?.setValue('district', undefined);
    getDistricts({
      id: provinceId,
    });
  }, [provinceId]);

  useEffect(() => {
    isChangeDistrict.current && methods?.setValue('wards', undefined);
    getWards({
      id: districtId,
    });
  }, [districtId]);

  const provinces = useMemo(() => {
    return formatData({ data: provinceData }) || [];
  }, [provinceData]);

  const districts = useMemo(() => {
    if (!provinceId) return [];
    return formatData({ data: dataDistrict }) || [];
  }, [dataDistrict]);

  const wards = useMemo(() => {
    if (!districtId) return [];
    return formatData({ data: dataWard }) || [];
  }, [dataWard]);

  return (
    <Row gutter={[10, 0]}>
      <Col
        span={12}
        lg={24}
      >
        <InputForm
          name='address'
          label={t('address')}
        />
      </Col>

      <Col
        span={12}
        lg={8}
      >
        <SelectForm
          placeholder='Select Provice'
          label={t('Province')}
          name='province'
          options={provinces || []}
          size='large'
          onChange={() => {
            isChangeProvince.current = true;
          }}
        />
      </Col>
      <Col
        span={12}
        lg={8}
      >
        <SelectForm
          placeholder='Select District'
          label={t('District')}
          name='district'
          options={districts || []}
          size='large'
          onChange={() => {
            isChangeDistrict.current = true;
          }}
        />
      </Col>
      <Col
        span={12}
        lg={8}
      >
        <SelectForm
          placeholder='Select Ward'
          label={t('Ward')}
          name='wards'
          options={wards}
          size='large'
        />
      </Col>
    </Row>
  );
}
