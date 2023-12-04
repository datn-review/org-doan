import { css, cx } from '@emotion/css';
import { useTranslation } from '@org/i18n';
import {
  useCreateCollaborationMutation,
  usePosterConfirmCollaborationMutation,
  useRegisterConfirmCollaborationMutation,
} from '@org/store';
import {
  Button,
  DeleteOutlined,
  FormProvider,
  H2,
  ModalAntd,
  RangePickerForm,
  Space,
  useForm,
  yupResolver,
} from '@org/ui';
import dayjs from 'dayjs';
import { useLayoutEffect, useRef, useState } from 'react';
import * as yup from 'yup';
// @ts-ignore
import SignatureCanvas from 'react-signature-canvas';
import { EnumStatusCollap } from '@org/utils';

type IUpdate = {
  time?: string;
};

const schema = yup.object({});
const dataInit: IUpdate = {
  time: undefined,
};

interface IProps {
  data: any;
  type: EnumTypeContact;
  close: () => void;
  refetch: () => void;
}

export enum EnumTypeContact {
  PostSignature,
  RegisterSignature,
  View,
}

export function Contants({ data, type, close, refetch }: IProps) {
  const { t } = useTranslation();
  const [signatureA, setSignatureA] = useState('');
  const [signatureB, setSignatureB] = useState('');

  const signatureRef = useRef(null);
  const signatureBRef = useRef(null);

  const methods = useForm<IUpdate>({
    defaultValues: dataInit,

    resolver: yupResolver(schema),
  });

  const [createCollaboration] = useCreateCollaborationMutation();

  const [registerConfirmCollaboration] = useRegisterConfirmCollaborationMutation();

  const [posterConfirmCollaboration] = usePosterConfirmCollaborationMutation();

  const submitContact = (value: any) => {
    // @ts-ignore
    const signA = signatureRef?.current?.getTrimmedCanvas().toDataURL('image/png');
    // @ts-ignore
    const signB = signatureBRef?.current?.getTrimmedCanvas().toDataURL('image/png');

    // setSignatureA(signA);
    // setSignatureB(signB);

    const contractStartDate = dayjs(value?.time?.[0]);
    const contractEndDate = dayjs(value?.time?.[1]);
    if (
      signA &&
      type === EnumTypeContact.PostSignature &&
      data.status === EnumStatusCollap.Pending
    ) {
      posterConfirmCollaboration({
        id: data?.id,
        signature: signA,
        contractTerms: 'contact',
        contractStartDate,
        contractEndDate,
      }).then(() => {
        refetch();
        close();
      });
    }

    if (
      signB &&
      type === EnumTypeContact.RegisterSignature &&
      data.status === EnumStatusCollap.PendingSignature
    ) {
      registerConfirmCollaboration({
        id: data?.id,
        signature: signB,
      }).then(() => {
        refetch();
        close();
      });
    }
  };
  // @ts-ignore
  // @ts-ignore
  return (
    <ModalAntd
      title={t('contact.title.success')}
      open={!!data}
      onCancel={close}
      width={'90%'}
      className={css`
        top: 20px;
      `}
      footer={<></>}
    >
      <FormProvider {...methods}>
        <Space
          className={css`
            text-align: center;
          `}
        >
          <Space>Website: www.tutorsmart.pttam.click</Space>
          <Space>{t('contact.address.title')}: Tam Vinh - Phú Ninh - Quảng Name - Việt Nam</Space>
          <Space>{t('contact.phone.title')}: 0792920565</Space>
          <br />
          <h2
            className={css`
              font-size: 2.6rem;

              font-weight: 600;
              margin-bottom: 2rem;
            `}
          >
            {t('contact.title')}
          </h2>
        </Space>
        <Space></Space>
        <Space>{t('contact.note.title')}</Space>

        {EnumStatusCollap.Pending !== data?.status && (
          <Space>
            <Space>
              {t('contact.startDate')}: {dayjs(data?.contractStartDate).format('DD-MM-YYYY')}
            </Space>
            <Space>
              {t('contact.endDate')}: {dayjs(data?.contractEndDate).format('DD-MM-YYYY')}
            </Space>

            {/*<Space>Dieu Khoan: {data?.contractTerms}</Space>*/}
          </Space>
        )}
        {EnumStatusCollap.Pending === data?.status && type === EnumTypeContact.PostSignature && (
          <RangePickerForm
            name='time'
            label={t('contact.time')}
          />
        )}

        {/*<Space>*/}
        {/*  {t('date.contact')}: {dayjs().format('DD-MM-YYYY')}*/}
        {/*</Space>*/}
        <Space>Bên A: Gia Sư </Space>
        <Space>
          {t('name')}: {data?.user?.lastName} {data?.user?.firstName}
        </Space>

        <Space>
          {t('email')}: {data?.user?.email}
        </Space>

        <Space>
          {t('address')}: {data?.user?.address}
        </Space>

        <Space>Bên B: Học Sinh</Space>
        <Space>
          {t('name')}: {data?.posts?.user?.lastName} {data?.posts?.user?.firstName}
        </Space>

        <Space>
          {t('email')}: {data?.posts?.user?.email}
        </Space>

        <Space>
          {t('address')}: {data?.posts?.user?.address}
        </Space>

        <Space>
          <br />
          Chúng tôi thoả thuận ký kết Hợp đồng Giao(Nhận) Lớp và cam kết làm đúng những điều khoản
          sau đây:
        </Space>
        <Space>
          Vì quyền lợi và uy tín lâu dài của cả hai bên kính mong Giáo Viên, Sinh Viên đọc kỹ hợp
          đồng này trước khi nhận lớp.
          <br />
          <br />
          <b>CÁC HÌNH THỨC NHẬN LỚP: </b>
          <br />
          1. Gia sư đến trực tiếp văn phòng trung tâm gia sư Tài Năng Trẻ tại địa chỉ : 1269/17 Phạm
          Thế Hiển, P5, Quận 8 để ký hợp đồng, đóng phí nhận lớp và nhận giấy giới thiệu trực tiếp.
          <br />
          2. Gia sư nhận lớp qua hình thức online. Gia sư sẽ gửi phí nhận lớp qua các tài khoản ngân
          hàng của trung tâm cung cấp bên trên. Giấy giới thiệu và hợp đồng sẽ được gửi qua tài
          khoản gia sư tại website daykemtainha.vn.
          <br />
          <br />
          Gia sư nhận lớp qua một trong hai hình thức trên đều sẽ chấp hành theo các điều khoản của
          hợp đồng giao ( nhận) lớp dưới đây:
          <br />
          HỢP đồng GIAO(NHẬN) LỚP và cam kết làm đúng những điều khoản sau đây:
          <br />
          <br />
          <b> Bên B : Phía gia sư </b>
          <br />
          Điều 1: Gia sư khi nhận lớp sẽ đóng phí trước khi nhận lớp cho trung tâm khoản phí như
          sau: <br />
          - Đóng 25% của học phí tháng đầu tiên đối với các môn năng khiếu, nghệ thuật, thể thao,
          ngoại ngữ, tin học, giáo dục trẻ đặc biệt. <br />
          - Đóng 25 - 30% của học phí tháng đầu tiên đối với các môn học văn hóa từ cấp tiểu học đến
          THPT (toán, lý, hóa, sinh, văn, tiểu học …)
          <br />
          <br />
          Điều 2: Khi đến gặp phụ huynh, Bên B vui lòng xuất trình với phụ huynh, Giấy giới thiệu
          (bắt buộc). <br />
          <br />
          Điều 3: Sau khi trung tâm cung cấp số điện thoại và địa chỉ của phụ huynh – học viên, Bên
          B phải alo hẹn gặp ngay. Khi gặp sự cố ( vì bất cứ lý do gì mà không tiến hành học: không
          dạy ngay, lùi ngày học,hay bất kỳ một lý do nào dù nhỏ nhất) phải báo cho Bên A khi bạn
          đang ở nhà phụ huynh hoặc vừa ra khỏi nhà phụ huynh.Các bạn gọi theo số điện thoại này từ
          Thứ 2-Chủ nhật 24/24 : 090 333 1985 hoặc 09 87 87 0217
          <br />
          <br />
          Điều 4: Bên B phải có trách nhiệm giữ lại Phiếu thu của ngân hàng cẩn thận, nếu có sự cố
          xảy ra chúng sẽ là chứng từ để trung tâm giải quyết hoàn phí.
          <br />
          <br />
          Điều 5: Sau 1 tháng đầu tiên, hợp đồng này chấm dứt. Nếu trong tháng đầu lỗi do phu huynh
          học viên trung tâm sẽ giải quyết cho gia sư dựa vào từ thời điểm nhận lớp đến thới điểm
          gia sư báo sự cố.
          <br />
          <br />
          <br />
          <b>Bên A : Phía trung tâm gia sư Tài Năng Trẻ </b>
          <br />
          Điều 6: Sau khi nhận phí Bên A sẽ cung cấp địa chỉ, số điện thoại của PHHS trên giấy giới
          thiệu và gọi điện báo thông tin của bên B cho Phụ huynh.
          <br />
          <br />
          Điều 7: Tùy theo từng trường hợp cụ thể Bên A sẽ giải quyết hoàn phí như sau :
          <br />
          <br />
          1/ Nếu Phụ Huynh không cho con học, học viên không học (Trung tâm sẽ cử người xác minh
          thông tin trong vòng từ 2 đến 7 ngày)
          <br />
          Bên A hoàn lại 100% phí.
          <br />
          <br />
          2/ Nếu Bên B : Dạy không đạt, học sinh không hiểu hoặc các trường hợp gia sư thiếu trách
          nhiệm.(chỉ áp dụng khi chưa nhận lương). Bên A thu 10% của học phí.
          <br />
          <br />
          3/ Nếu Bên B: Thay đổi bất kỳ điều khoản ban đầu (PH đồng ý mà Bên B không dạy, đi trễ về
          sớm,hẹn phụ huynh mà không đến đúng hẹn,tự ý gọi lại phụ huynh đổi lịch hẹn, lấy lý do xa
          quá, tăng lương,hoặc đau ốm,có người thân nhập viện trả lớp,tự ý thương lượng mức lương
          khi phụ huynh yêu cầu,tăng số buổi dạy,tăng số học sinh so với hợp đồng ban đầu, không
          liên hệ phụ huynh ngay dẫn đến tình trạng mất lớp, dạy vài buổi đòi phụ huynh đóng tiền.…)
          <br />- Vi phạm Điều 2 hoặc Điều 3 của hợp đồng
          <br />- Nói không đúng sự thật. ( Nhờ Phụ Huynh báo với Bên A, nói không chính xác)
          <br />- Báo với Phụ huynh đóng phí nhận lớp cho trung tâm. Bên A không hoàn trả phí.
          <br />
          <br />
        </Space>

        <Space
          className={css`
            display: flex;
            justify-content: space-around;
            text-align: center;
          `}
        >
          <Space>
            Bên A
            {EnumStatusCollap.Pending === data?.status && (
              <Space
                className={css`
                  position: relative;
                `}
              >
                <SignatureCanvas
                  ref={signatureRef}
                  penColor='black'
                  canvasProps={{
                    width: 200,
                    height: 100,
                    className: cx(
                      'sigCanvas',
                      css`
                        border: 1px solid black;
                      `,
                    ),
                  }}
                />

                <DeleteOutlined
                  className={css`
                    position: absolute;
                    top: 3px;
                    transform: scale(1.2);
                    right: 2px;
                  `}
                  onClick={() => {
                    //@ts-ignore
                    signatureRef?.current?.clear();
                  }}
                />
              </Space>
            )}
            {EnumStatusCollap.Pending !== data?.status && (
              <Space
                className={css`
                  width: 200px;
                  height: 100px;
                  border: 1px solid black;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                `}
              >
                <img
                  src={data?.studentSignature}
                  alt={'signatureA'}
                />
              </Space>
            )}
          </Space>
          <Space>
            Bên B
            {EnumStatusCollap.PendingSignature === data?.status && (
              <>
                <SignatureCanvas
                  ref={signatureBRef}
                  penColor='black'
                  canvasProps={{
                    width: 200,
                    height: 100,
                    className: cx(
                      'sigCanvas',
                      css`
                        border: 1px solid black;
                      `,
                    ),
                  }}
                />
                <DeleteOutlined />
              </>
            )}
            {EnumStatusCollap.PendingSignature !== data?.status && (
              <Space
                className={css`
                  width: 200px;
                  height: 100px;
                  border: 1px solid black;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                `}
              >
                {data?.tutorSignature && (
                  <img
                    src={data?.tutorSignature || ''}
                    alt={'signatureB'}
                  />
                )}
              </Space>
            )}
          </Space>
        </Space>
        <br />
        <br />
        <br />

        {/*<Button*/}
        {/*    onClick={methods.handleSubmit((value) => {*/}
        {/*        submitContact(value);*/}
        {/*    })}*/}
        {/*>*/}
        {/*    {EnumStatusCollap.Pending === data?.status && t('contact.confirm.post')}*/}
        {/*    {EnumStatusCollap.PendingSignature === data?.status && t('contact.confirm.register')}*/}
        {/*</Button>*/}
        {(EnumStatusCollap.Pending === data?.status ||
          EnumStatusCollap.PendingSignature === data?.status) && (
          <Button
            onClick={methods.handleSubmit((value) => {
              submitContact(value);
            })}
          >
            {EnumStatusCollap.Pending === data?.status && t('contact.confirm.post')}
            {EnumStatusCollap.PendingSignature === data?.status && t('contact.confirm.register')}
          </Button>
        )}
      </FormProvider>
    </ModalAntd>
  );
}
