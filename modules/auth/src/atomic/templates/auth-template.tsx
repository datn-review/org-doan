import { Col, Row, Space, BoxCenter } from "@org/ui";
import React, { PropsWithChildren } from "react";
import { css } from "@emotion/css";
import bg from "../../assets/images/background.png";
import { Link } from "react-router-dom";

export function AuthTemplate({ children }: PropsWithChildren) {
  return (
    <Row
      className={css`
        background-color: #fff;
        min-height: 100vh;
      `}
    >
      <Col
        span={0}
        lg={16}
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
      <Col span={24} lg={8}>
        <BoxCenter>
          <Space
            className={css`
              padding: 4.2rem 2rem;
              height: 100%;
              max-width: 50rem;
              width: 100%;
            `}
          >
            <BoxCenter>
              <Link to="/">
                <img
                  src="/assets/image/logo.jpg"
                  alt="Login"
                  className="h-[40px]"
                />
              </Link>
            </BoxCenter>
            <>{children}</>
          </Space>
        </BoxCenter>
      </Col>
    </Row>
  );
}
