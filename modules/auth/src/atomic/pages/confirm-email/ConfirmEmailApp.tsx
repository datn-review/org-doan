import { css } from "@emotion/css/macro";
import { useTranslation } from "@org/i18n";
import { useAppDispatch, useConfirmUserEmailMutation } from "@org/store";
import { Button, Show, Space, Spin } from "@org/ui";
import { SiteMap } from "@org/utils";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function ConfirmEmailApp() {
  const { hash } = useParams();

  const [confirmUserEmail, { isLoading, isSuccess }] =
    useConfirmUserEmailMutation();
  useEffect(() => {
    confirmUserEmail({
      hash,
    });
  }, [hash]);

  return (
    <div>
      <Space
        className={css`
          padding-top: 1rem;
          padding-bottom: 3rem;
        `}
      >
        <h5
          className={css`
            padding-bottom: 0.8rem;
          `}
        >
          Verify your email ✉️
        </h5>
        <p>
          Account activation link sent to your email address: hello@example.com
          Please follow the link inside to continue.
        </p>
      </Space>
      <Show when={isLoading}>
        <Spin spinning={isLoading}>Đang Xác Nhận....</Spin>
      </Show>

      <Show
        when={isSuccess}
        fallback={
          <>
            <Space>⛔Xác Nhận Không Thành Công!⛔</Space>
          </>
        }
      >
        <Space>✅Xác Nhận Thành Công!✅</Space>
        <br />
        <Link to={SiteMap.Auth.Login.path}>
          <Button>Back To Login</Button>
        </Link>
      </Show>
    </div>
  );
}

export default ConfirmEmailApp;
