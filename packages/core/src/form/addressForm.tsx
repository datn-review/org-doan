import {
  useGetProvinceActiveQuery,
  useLazyGetDistrictActiveQuery,
  useLazyGetDistrictQuery,
  useLazyGetWardActiveQuery,
} from '@org/store';
import { Col, InputForm, Row, SelectForm } from '@org/ui';
import { formatData } from '@org/utils';
import React, { useEffect, useMemo } from 'react';
export const statusOptionUpsert = [{ value: 1, label: 1 }];

export function AddressForm({ methods }: any) {
  const { data: provinceData } = useGetProvinceActiveQuery({});
  const [getDistricts, { data: dataDistrict }] = useLazyGetDistrictActiveQuery();
  const [getWards, { data: dataWard }] = useLazyGetWardActiveQuery();

  const districtId = methods?.watch('district');
  const provinceId = methods?.watch('province');

  useEffect(() => {
    methods?.setValue('district', 3);
    getDistricts({
      id: provinceId,
    });
  }, [provinceId]);

  useEffect(() => {
    methods?.setValue('wards', 1);
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
          label='Địa Chỉ Chi Tiết*'
        />
      </Col>

      <Col
        span={12}
        lg={8}
      >
        <SelectForm
          placeholder='Select Provice'
          label={'Province'}
          name='province'
          options={provinces || []}
          size='large'
        />
      </Col>
      <Col
        span={12}
        lg={8}
      >
        <SelectForm
          placeholder='Select District'
          label={'District'}
          name='district'
          options={districts || []}
          size='large'
        />
      </Col>
      <Col
        span={12}
        lg={8}
      >
        <SelectForm
          placeholder='Select Ward'
          label={'Ward'}
          name='wards'
          options={wards}
          size='large'
        />
      </Col>
    </Row>
  );
}
