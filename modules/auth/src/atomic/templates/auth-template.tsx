import { Col, Row, Space, BoxCenter } from "@org/ui";
import React, { PropsWithChildren } from "react";
import { css } from "@emotion/css";
import bg from "../../image/background.png";

export function AuthTemplate({ children }: PropsWithChildren) {
  return (
    <Row
      className={css`
        background-color: "#fff";
        min-height: 100vh;
      `}
    >
      <Col
        span={0}
        sm={16}
        className={css`
          padding: 3.2rem 0 3.2rem 3.2rem;
        `}
      >
        <BoxCenter
          className={css`
            background-color: #f8f7fa;
            height: 100%;
            border-radius: 0.5rem;
          `}
        >
          <img
            src={bg}
            alt="BG"
            className={css`
              height: 57rem;
            `}
          />
        </BoxCenter>
      </Col>
      <Col span={0} sm={8}>
        <Space
          className={css`
            padding: 4.2rem 2rem;
            height: 100%;
          `}
        >
          <>{children}</>
        </Space>
      </Col>
    </Row>
  );
}
