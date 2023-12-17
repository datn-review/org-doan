import {
  BoxCenter,
  Button,
  CheckCircleFilled,
  CheckCircleOutlined,
  CheckoutSvg,
  Space,
  Spin,
} from '@org/ui';
import { Link, useLocation } from 'react-router-dom';
import { css } from '@emotion/css';
import querystring from 'qs';
import { useEffect } from 'react';
import { useLazyGetReturnPaymentQuery } from '@org/store';
import { useTranslation } from '@org/i18n';

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
  const { t } = useTranslation();
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
      <BoxCenter>
        {data?.status ? (
          <BoxCenter
            className={css`
              flex-direction: column;
            `}
          >
            <h4>
              {StatusPay[data?.data?.code as keyof typeof StatusPay]} <br />
            </h4>
            <CheckCircleOutlined style={{ color: 'green', fontSize: 50 }} />
            <br></br>
            <Link to={'/'}>
              <Button>{t('back.to.home')}</Button>
            </Link>
          </BoxCenter>
        ) : (
          <h4>Đang Thực Hiện Giao Dịch...</h4>
        )}
      </BoxCenter>
      <BoxCenter
        className={css`
          height: 70vh;
          width: 100vw;
        `}
      >
        <BoxCenter
          className={css`
            height: 50vh;
            width: 50vw;
          `}
        >
          <CheckoutSvg />
        </BoxCenter>
      </BoxCenter>
      ;
    </Spin>
  );
};
