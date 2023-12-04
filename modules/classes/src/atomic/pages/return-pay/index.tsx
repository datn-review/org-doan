import { Button, Space, Spin } from '@org/ui';
import { Link, useLocation } from 'react-router-dom';
import { css } from '@emotion/css';
import querystring from 'qs';
import { useEffect } from 'react';
import { useLazyGetReturnPaymentQuery } from '@org/store';

const StatusPay = {
  ['00']: 'Giao dịch thành công',
  ['01']: 'Giao dịch chưa hoàn tất',
  ['02']: '	Giao dịch bị lỗi',
  ['04']:
    'Giao dịch đảo (Khách hàng đã bị trừ tiền tại Ngân hàng nhưng GD chưa thành công ở VNPAY)',
  ['05']: 'VNPAY đang xử lý giao dịch này (GD hoàn tiền)',
  ['06']: 'VNPAY đã gửi yêu cầu hoàn tiền sang Ngân hàng (GD hoàn tiền)',
  ['07']: 'Giao dịch bị nghi ngờ gian lận',
  ['09']: 'GD Hoàn trả bị từ chối',
};
export const ReturnPayPage = () => {
  const location = useLocation();
  const query = querystring.parse(location?.search, {
    ignoreQueryPrefix: true,
  });
  const [getData, { data, isLoading }] = useLazyGetReturnPaymentQuery();
  useEffect(() => {
    if (query) {
      getData({
        ...query,
      }).unwrap();
    }
  }, [JSON.stringify(query)]);
  return (
    <Spin
      tip='Loading'
      size='large'
      spinning={isLoading}
    >
      <Space
        className={css`
          height: 100vh;
          width: 100vw;
        `}
      >
        {data?.status ? (
          <Space>
            <Space>{StatusPay[data?.data?.code as keyof typeof StatusPay]}</Space>
            <Link to={'/'}>
              <Button>Tro Ve Trang Chu</Button>
            </Link>
          </Space>
        ) : (
          <Space>Đang Thực Hiện Giao Dịch</Space>
        )}
      </Space>
      ;
    </Spin>
  );
};
