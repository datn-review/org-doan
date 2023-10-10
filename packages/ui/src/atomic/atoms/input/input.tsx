import { css, cx } from '@emotion/css';
import { FormEvent, HTMLAttributes, useState } from 'react';
import { withForm } from '../../../form';
import { Space } from '../space';
import { Show } from '../show';
import { IconEye, IconEyeClose } from '../../../icons';

export enum TypeInput {
  Password = 'password',
  Text = 'text',
}

export type IInput = HTMLAttributes<HTMLInputElement> & {
  name: string;
  onChange?: (value: string) => void;
  value?: any;
  labelInput?: string;
  $type?: TypeInput;
};

export function Input({ onChange, value, labelInput, className, $type, ...props }: IInput) {
  const [hidePassword, setHidePassword] = useState(true);
  console.log(TypeInput.Password === $type && hidePassword ? TypeInput.Password : TypeInput.Text);
  return (
    <>
      {labelInput && (
        <label
          className={css`
            display: block;
            padding-bottom: 0.3rem;
            font-size: 1.3rem;
          `}
        >
          {labelInput}
        </label>
      )}
      <Space
        className={css`
          position: relative;
          width: 100%;
        `}
      >
        <input
          className={cx(
            css`
              border: 0.1rem solid #c5c4c5;
              width: 100%;
              margin-bottom: 0.5rem;
              padding: 0.8rem 1rem;
              border-radius: 0.5rem;
              outline: none;
              font-size: 1.5rem;
            `,
            className,
          )}
          type={TypeInput.Password === $type && hidePassword ? TypeInput.Password : TypeInput.Text}
          {...props}
          onChange={(e: FormEvent<HTMLInputElement>) => {
            onChange && onChange(e.currentTarget.value);
          }}
          value={value && value}
        />
        <Show when={$type === TypeInput.Password}>
          <Space
            onClick={() => setHidePassword((prev) => !prev)}
            className={css`
              position: absolute;
              right: 1rem;
              top: 50%;
              transform: translateY(-60%);
            `}
          >
            <Show
              when={hidePassword}
              fallback={<IconEyeClose />}
            >
              <IconEye />
            </Show>
          </Space>
        </Show>
      </Space>
    </>
  );
}

export const InputForm = withForm<IInput>(Input);
